import { Test, TestingModule } from '@nestjs/testing';
import { LanguageService } from './language.service';
import { LanguageResolver } from './language.resolver';
import { LanguageRepository } from './language.repository';

describe('LanguageResolver', () => {
    let resolver: LanguageResolver;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [LanguageService, LanguageResolver, LanguageRepository],
        }).compile();

        resolver = module.get<LanguageResolver>(LanguageResolver);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });

    // TODO more tests
});
