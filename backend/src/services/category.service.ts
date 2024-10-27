import {Category} from '../models/category.model';

export class CategoryService {
  async getAllCategories(language: string) {
    const field = language === 'fr' ? 'name_fr' : 'name_en';
    return await Category.findAll({
      attributes: ['id', [field, 'name']],
    });
  }

  async createCategory(data: { name_fr: string, name_en: string }) {
    return await Category.create(data);
  }
}
