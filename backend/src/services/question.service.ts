import { Question } from '../models/question.model';
import {  Category } from '../models/category.model';

// Service pour récupérer les questions en fonction de la catégorie et du niveau de difficulté
export const getQuestionsByCategoryDifficultyAndLanguage = async (
  category: string, 
  difficulty: string, 
  language: string
) => {
  try {
    
    // Récupérer la catégorie en fonction du nom et de la langue
    const foundCategory = await Category.findOne({
      where: { name: category },
    });

    // Vérifier si la catégorie existe
    if (!foundCategory) {
      throw new Error(`Category '${category}' not found in language '${language}'`);
    }

    // Récupérer les questions associées à la catégorie, la difficulté et la langue
    const questions = await Question.findAll({
      where: {
        categoryId: foundCategory.id,  // Utiliser l'ID de la catégorie récupérée
        difficulty,
        language,
      },
    });

    return questions;
  } catch (error) {
    console.error('Error while fetching questions:', error);
    throw error;
  }
};

// Service pour ajouter une nouvelle question
export const addQuestion = async (content: string, answers: string[], correctAnswer: string, language: string, difficulty: string, categoryName: string) => {
  try {
    // Récupérer l'ID de la catégorie en fonction du nom
    const category = await Category.findOne({ where: { name: categoryName } });
    if (!category) {
      throw new Error('Category not found');
    }

    // Créer la question en utilisant l'ID de la catégorie
    const question = await Question.create({
      content,
      answers,
      correctAnswer,
      language,
      difficulty,
      categoryId: category.id // Assurez-vous d'utiliser l'ID de la catégorie
    });
    
    return question;
  } catch (error) {
    console.error('Error while adding question:', error);
    throw new Error('Erreur lors de l\'ajout de la question');
  }
};



// Service pour modifier une question existante
export const updateQuestion = async (id: number, updates: Partial<{ content: string, answers: string[], correctAnswer: string, language: string, difficulty: string }>) => {
  try {
    const question = await Question.findByPk(id);
    if (!question) {
      throw new Error('Question non trouvée');
    }

    await question.update(updates);
    return question;
  } catch (error) {
    throw new Error('Erreur lors de la mise à jour de la question');
  }
};

// Service pour supprimer une question par son ID
export const deleteQuestion = async (id: number) => {
  try {
    const question = await Question.findByPk(id);
    if (!question) {
      throw new Error('Question non trouvée');
    }

    await question.destroy();
    return true;
  } catch (error) {
    throw new Error('Erreur lors de la suppression de la question');
  }
};
