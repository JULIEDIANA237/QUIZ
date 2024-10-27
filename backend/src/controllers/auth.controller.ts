import { Request, Response } from 'express';
import { registerUser, loginUser, logoutUser, getUserProfile } from '../services/auth.service';

interface CustomRequest extends Request {
  userId?: number;
}


export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const newUser = await registerUser(name, email, password);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const { token, user } = await loginUser(email, password);
    if (token) {
      res.json({ token, user });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const result = await logoutUser(req);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error during logout' });
  }
};

export const profile = async (req: CustomRequest, res: Response): Promise<void> => {
  const userId = req.userId; // TypeScript sait maintenant que userId est inclus

  if (typeof userId !== 'number') {
    res.status(400).json({ error: 'User ID is required' });
    return;
  }

  try {
    const userProfile = await getUserProfile(userId);
    if (userProfile) {
      res.json(userProfile);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving user profile' });
  }
};
