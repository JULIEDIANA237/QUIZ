import { Request, Response } from 'express';
import { CategoryService } from '../services/category.service';
import { ParsedQs } from 'qs'; // Pour la gestion des types dans req.query

const categoryService = new CategoryService();

export class CategoryController {
  async getCategories(req: Request, res: Response) {
    // Utilisation de la méthode `toString()` pour forcer le type string
    const language = (req.query.language as string) || 'en'; 
    const categories = await categoryService.getAllCategories(language);
    res.json(categories);
  }

  async createCategory(req: Request, res: Response) {
    const { name_fr, name_en } = req.body;
    const category = await categoryService.createCategory({ name_fr, name_en });
    res.status(201).json(category);
  }
}
