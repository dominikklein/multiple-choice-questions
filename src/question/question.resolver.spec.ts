import { Test, TestingModule } from '@nestjs/testing';
import { QuestionService } from './question.service';
import { QuestionResolver } from './question.resolver';
import { QuestionRepository } from './question.repository';
import { LanguageRepository } from '../language/language.repository';
import { LanguageService } from '../language/language.service';
import { CategoryRepository } from '../category/category.repository';
import { CategoryService } from '../category/category.service';

describe('QuestionResolver', () => {
    let resolver: QuestionResolver;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                QuestionService,
                QuestionResolver,
                QuestionRepository,
                LanguageRepository,
                LanguageService,
                CategoryRepository,
                CategoryService,
            ],
        }).compile();

        resolver = module.get<QuestionResolver>(QuestionResolver);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });

    // TODO more tests
});
