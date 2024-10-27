import { Router } from 'express';
import { register, login, logout, profile } from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware'; // Middleware pour vérifier le token

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', authMiddleware, logout); // Ajoutez le middleware d'authentification
router.get('/profile', authMiddleware, profile); // Ajoutez le middleware d'authentification

export default router;
