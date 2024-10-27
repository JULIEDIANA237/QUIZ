import { Request, Response } from 'express';
import { getAllUsersFromDB, getUserByIdFromDB, updateUserInDB, deleteUserFromDB, changeUserPasswordInDB } from '../services/user.service';

// Récupérer tous les utilisateurs
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await getAllUsersFromDB();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
};

// Récupérer un utilisateur par ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const user = await getUserByIdFromDB(id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return; // Ajout de return pour éviter d'exécuter le reste du code
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user' });
  }
};

// Mettre à jour un utilisateur par ID
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const updatedUser = await updateUserInDB(id, { name, email });
    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
      return; // Ajout de return pour éviter d'exécuter le reste du code
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
  }
};

// Supprimer un utilisateur par ID
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const deletedUser = await deleteUserFromDB(id);
    if (!deletedUser) {
      res.status(404).json({ message: 'User not found' });
      return; // Ajout de return pour éviter d'exécuter le reste du code
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
};

// Endpoint pour changer le mot de passe
export const changeUserPassword = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { newPassword } = req.body;

  console.log(`Changing password for user ID: ${id}`);

  if (!newPassword || newPassword.length < 6) {
    res.status(400).json({ message: 'Password must be at least 6 characters long' });
    return;
  }

  try {
    const updatedUser = await changeUserPasswordInDB(id, newPassword);
    if (!updatedUser) {
      console.log(`User with ID: ${id} not found`);
      res.status(404).json({ message: 'User not found' });
      return;
    }
    console.log(`Password updated successfully for user ID: ${id}`);
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ error: 'Error updating password' });
  }
};
