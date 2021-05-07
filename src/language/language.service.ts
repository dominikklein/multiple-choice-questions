import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Language } from './language.entity';
import { CreateLanguageInput, UpdateLanguageInput } from './language.input';
import { LanguageRepository } from './language.repository';

@Injectable()
export class LanguageService {
    constructor(
        @InjectRepository(LanguageRepository)
        private languageRepository: LanguageRepository
    ) {}

    async getLanguage(id: number): Promise<Language> {
        const language = await this.languageRepository.findOne({ id });

        if (!language) {
            throw new NotFoundException(`Language with ID "${id}" not found`);
        }

        return language;
    }

    async languageExists(id: number): Promise<boolean> {
        const language = await this.languageRepository.findOne({ id });

        return !!language;
    }

    async getLanguages(): Promise<Language[]> {
        return await this.languageRepository.find();
    }

    async createLanguage(createLanguageInput: CreateLanguageInput): Promise<Language> {
        const language = this.languageRepository.create(createLanguageInput);

        return await this.languageRepository.save(language);
    }

    async updateLanguage(id: number, updateLanguageInput: UpdateLanguageInput): Promise<Language> {
        const language = await this.getLanguage(id);

        return await this.languageRepository.save({
            ...language,
            ...updateLanguageInput,
        });
    }

    async deleteLanguage(id: number): Promise<Language> {
        const language = await this.getLanguage(id);

        return await this.languageRepository.remove(language);
    }
}
