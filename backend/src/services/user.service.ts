import { User } from '../models/user.model';
import bcrypt from 'bcrypt';

// Changer le mot de passe d'un utilisateur
export const changeUserPasswordInDB = async (id: string, newPassword: string) => {
  const user = await User.findByPk(id);
  if (user) {
    const hashedPassword = await bcrypt.hash(newPassword, 10); // Hashage du nouveau mot de passe
    await user.update({ password: hashedPassword });
    return user;
  }
  return null;
};

// Récupérer tous les utilisateurs
export const getAllUsersFromDB = async () => {
  return await User.findAll();
};

// Récupérer un utilisateur par ID
export const getUserByIdFromDB = async (id: string) => {
  return await User.findByPk(id);
};

// Mettre à jour un utilisateur
export const updateUserInDB = async (id: string, updateData: Partial<User>) => {
  const user = await User.findByPk(id);
  if (user) {
    await user.update(updateData);
    return user;
  }
  return null;
};

// Supprimer un utilisateur
export const deleteUserFromDB = async (id: string) => {
  const user = await User.findByPk(id);
  if (user) {
    await user.destroy();
    return user;
  }
  return null;
};
