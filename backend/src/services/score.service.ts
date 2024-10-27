import { Score } from '../models/score.model';
import { User } from '../models/user.model';  // Assurez-vous d'importer le modèle User

export class ScoreService {
  // Créer un score pour un utilisateur connecté
  async createScore(userId: number, score: number) {
    // On crée un nouvel enregistrement de score associé à l'utilisateur
    return await Score.create({ userId, score });
  }

  // Récupérer tous les scores
  async getAllScores() {
    return await Score.findAll({
      include: [User],  // Inclure les informations de l'utilisateur si besoin
    });
  }

  // Récupérer les scores par utilisateur
  async getScoresByUserId(userId: number) {
    return await Score.findAll({
      where: { userId },
      include: [User],  // Inclure les informations de l'utilisateur si besoin
    });
  }

  // Récupérer un score par son ID
  async getScoreById(id: number) {
    return await Score.findByPk(id, {
      include: [User],  // Inclure les informations de l'utilisateur si besoin
    });
  }

  // Récupérer le meilleur score d'un utilisateur
  async getBestScoreByUserId(userId: number) {
    return await Score.findOne({
      where: { userId },
      order: [['score', 'DESC']],  // Trier par score décroissant pour obtenir le meilleur score
    });
  }

  // Mettre à jour un score
  async updateScore(id: number, userId: number, score: number) {
    const scoreEntry = await this.getScoreById(id);
    if (scoreEntry) {
      scoreEntry.userId = userId;
      scoreEntry.score = score;
      await scoreEntry.save();
      return scoreEntry;
    }
    throw new Error('Score not found');
  }

  // Supprimer un score
  async deleteScore(id: number) {
    const scoreEntry = await this.getScoreById(id);
    if (scoreEntry) {
      await scoreEntry.destroy();
      return true;
    }
    throw new Error('Score not found');
  }
}
