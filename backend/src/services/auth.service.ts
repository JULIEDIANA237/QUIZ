import { User } from '../models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request } from 'express';

// Un tableau pour stocker les tokens invalidés (cela doit être persistant en production)
const invalidatedTokens: string[] = [];

export const registerUser = async (name: string, email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ name, email, password: hashedPassword });
  return newUser;
};

export const loginUser = async (email: string, password: string) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    return { token, user }; // Return user data along with token
  } catch (error) {
    const errorMessage = (error as Error).message;
    return { error: errorMessage };
  }
};

export const logoutUser = async (req: Request) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Récupère le token

  if (token) {
    // Ajoutez le token à la liste des tokens invalidés
    invalidatedTokens.push(token);
    return { message: 'Logout successful' };
  }

  throw new Error('No token provided');
};

export const getUserProfile = async (userId: number) => {
  const user = await User.findByPk(userId, {
    attributes: { exclude: ['password'] }, // Exclure le mot de passe du profil
  });
  return user;
};
