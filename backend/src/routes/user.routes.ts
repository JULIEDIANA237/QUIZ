import { Router } from 'express';
import { getAllUsers, getUserById, updateUser, deleteUser, changeUserPassword } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware'; // Middleware pour protéger certaines routes

const router = Router();

// Route pour récupérer tous les utilisateurs (admin uniquement)
router.get('/', authMiddleware, getAllUsers);

// Route pour récupérer un utilisateur par ID (accès protégé)
router.get('/:id', authMiddleware, getUserById);

// Route pour mettre à jour un utilisateur par ID (accès protégé)
router.put('/:id', authMiddleware, updateUser);

// Route pour supprimer un utilisateur par ID (admin uniquement)
router.delete('/:id', authMiddleware, deleteUser);

// Route pour changer le mot de passe d'un utilisateur
router.put('/:id/password', authMiddleware, changeUserPassword);



export default router;
