import { Request, Response } from 'express';
import { addQuestion, getQuestionsByCategoryDifficultyAndLanguage, updateQuestion, deleteQuestion } from '../services/question.service';

// Contrôleur pour récupérer les questions en fonction de la catégorie, difficulté et langue
export const getQuestions = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, difficulty, language } = req.query;

    // Logs pour vérifier les paramètres d'entrée
    console.log('Received parameters:', { category, difficulty, language });

    // Validation des paramètres
    if (!category || !difficulty || !language) {
      console.log('Missing required parameters');
      res.status(400).json({ message: 'Category, difficulty, and language are required' });
      return;
    }

    // Appeler le service pour récupérer les questions
    const questions = await getQuestionsByCategoryDifficultyAndLanguage(category as string, difficulty as string, language as string);

    // Log le nombre de questions récupérées
    console.log(`Retrieved ${questions.length} questions`);

    res.status(200).json(questions);
  } catch (error: any) {
    // Log complet de l'erreur dans la console pour voir les détails
    console.error('Error while retrieving questions:', error);

    // Réponse d'erreur plus détaillée pour le client (Postman dans ce cas)
    res.status(500).json({
      message: 'Server error',
      error: error.message || 'Unknown error',
    });
  }
};


// Contrôleur pour créer une nouvelle question
export const createQuestion = async (req: Request, res: Response): Promise<void> => {
  // Vérifiez que le corps de la requête contient bien les données
  const { content, answers, correctAnswer, language, difficulty, categoryName } = req.body;

  // Log des données reçues
  console.log('Received request to create question:', req.body);

  // Validation des données
  if (!content || !answers || !correctAnswer || !language || !difficulty || !categoryName) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }

  try {
    const newQuestion = await addQuestion(content, answers, correctAnswer, language, difficulty, categoryName);
    res.status(201).json(newQuestion);
  } catch (error: any) {
    console.error('Error adding question:', error); // Log plus détaillé
    res.status(500).json({ error: 'Error adding question', details: error.message }); // Ajoute des détails sur l'erreur
  }
};
// Contrôleur pour mettre à jour une question
export const updateQuestionById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedQuestion = await updateQuestion(Number(id), updates);
    res.status(200).json(updatedQuestion);
  } catch (error: any) {
    res.status(500).json({ error: 'Error updating question', details: error.message });
  }
};

// Contrôleur pour supprimer une question
export const deleteQuestionById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    await deleteQuestion(Number(id));
    res.status(200).json({ message: 'Question supprimée avec succès' });
  } catch (error: any) {
    res.status(500).json({ error: 'Error deleting question', details: error.message });
  }
};
