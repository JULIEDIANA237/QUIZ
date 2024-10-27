import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export interface CustomRequest extends Request {
  userId?: number;
}

export const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction): void => {
  console.log("authMiddleware appelé");

  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    console.log('Erreur : Aucun token fourni');
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  // Décodage sans vérification pour inspecter le contenu
  const decodedPayload = jwt.decode(token);
  console.log('Contenu brut du token:', decodedPayload);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    console.log('Payload décodé et vérifié:', decoded);

    req.userId = decoded.id ? Number(decoded.id) : undefined;

    if (!req.userId) {
      console.log('Erreur : Aucun userId dans le token');
      res.status(401).json({ message: 'Invalid token structure' });
      return;
    }

    next();
  } catch (error) {
    console.error('Erreur lors de la vérification du token:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};


