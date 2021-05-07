import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CreateCategoryInput, UpdateCategoryInput } from './category.input';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryRepository)
        private categoryRepository: CategoryRepository
    ) {}

    async getCategory(id: number): Promise<Category> {
        const category = await this.categoryRepository.findOne({ id });

        if (!category) {
            throw new NotFoundException(`Category with ID "${id}" not found`);
        }

        return category;
    }

    async categoryExists(id: number): Promise<boolean> {
        const category = await this.categoryRepository.findOne({ id });

        return !!category;
    }

    async getCategorys(): Promise<Category[]> {
        return await this.categoryRepository.find();
    }

    async createCategory(createCategoryInput: CreateCategoryInput): Promise<Category> {
        const category = this.categoryRepository.create(createCategoryInput);

        return await this.categoryRepository.save(category);
    }

    async updateCategory(id: number, updateCategoryInput: UpdateCategoryInput): Promise<Category> {
        const category = await this.getCategory(id);

        return this.categoryRepository.save({
            ...category,
            ...updateCategoryInput,
        });
    }

    async deleteCategory(id: number): Promise<Category> {
        const category = await this.getCategory(id);

        return await this.categoryRepository.remove(category);
    }
}
