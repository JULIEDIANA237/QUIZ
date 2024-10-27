import { Request, Response } from 'express';
import { ScoreService } from '../services/score.service';
import {CustomRequest} from '../middlewares/auth.middleware';

const scoreService = new ScoreService();

export class ScoreController {

 // Créer un score pour l'utilisateur connecté
async createScore(req: CustomRequest, res: Response): Promise<void> {
  try {
    const { score } = req.body;
    const userId = req.userId;

    console.log('Score reçu:', score);
    console.log('UserID extrait du token:', userId);

    if (!userId) {
      console.log('Erreur : Utilisateur non authentifié');
      res.status(400).json({ error: 'Utilisateur non authentifié' });
      return;
    }

    const scoreEntry = await scoreService.createScore(userId, score);
    console.log('Score enregistré avec succès:', scoreEntry);
    res.status(201).json(scoreEntry);

  } catch (error) {
    // Vérifier que `error` est bien une instance de Error pour accéder à `error.message`
    if (error instanceof Error) {
      console.error('Erreur lors de la création du score:', error.message);
      res.status(500).json({ error: 'Une erreur est survenue', details: error.message });
    } else {
      // En cas d'erreur inconnue, on peut aussi retourner un message générique
      console.error('Erreur inconnue lors de la création du score:', error);
      res.status(500).json({ error: 'Une erreur est survenue' });
    }
  }
}


  // Obtenir un score par ID
  async getScoreById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const scoreEntry = await scoreService.getScoreById(Number(id));
      if (scoreEntry) {
        res.status(200).json(scoreEntry);
      } else {
        res.status(404).json({ error: 'Score non trouvé' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Une erreur est survenue' });
    }
  }

  // Mettre à jour un score
  async updateScore(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { score } = req.body;
      const userId = req.userId;

      if (!userId) {
        res.status(400).json({ error: 'Utilisateur non authentifié' });
        return;
      }

      const updatedScore = await scoreService.updateScore(Number(id), userId, score);
      res.status(200).json(updatedScore);
    } catch (error) {
      res.status(500).json({ error: 'Une erreur est survenue' });
    }
  }

  // Récupérer le meilleur score d'un utilisateur
  async getBestScore(req: CustomRequest, res: Response): Promise<void> {
    try {
      const userId = req.userId;

      if (!userId) {
        res.status(400).json({ error: 'Utilisateur non authentifié' });
        return;
      }

      const bestScore = await scoreService.getBestScoreByUserId(userId);
      if (bestScore) {
        res.status(200).json(bestScore);
      } else {
        res.status(404).json({ message: 'Aucun score trouvé pour cet utilisateur' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Une erreur est survenue' });
    }
  }

  // Supprimer un score
  async deleteScore(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await scoreService.deleteScore(Number(id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Une erreur est survenue' });
    }
  }
}
