import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Language } from './language.entity';
import { LanguageService } from './language.service';

const oneLanguage = {
    id: 1,
    name: 'English',
    code: 'en',
};

const languageList = [
    oneLanguage,
    {
        id: 2,
        name: 'German',
        code: 'de',
    },
];

describe('LanguageService', () => {
    let service: LanguageService;
    let repo: Repository<Language>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                LanguageService,
                {
                    provide: getRepositoryToken(Language),
                    useValue: {
                        find: jest.fn().mockResolvedValue(languageList),
                        findOne: jest.fn().mockResolvedValue(oneLanguage),
                        create: jest.fn().mockReturnValue(oneLanguage),
                        save: jest.fn().mockReturnValue(oneLanguage),
                        // as these do not actually use their return values in our sample
                        // we just make sure that their resolve is true to not crash
                        update: jest.fn().mockResolvedValue(oneLanguage),
                        // as these do not actually use their return values in our sample
                        // we just make sure that their resolve is true to not crash
                        remove: jest.fn().mockResolvedValue(oneLanguage),
                    },
                },
            ],
        }).compile();

        service = module.get<LanguageService>(LanguageService);
        repo = module.get<Repository<Language>>(getRepositoryToken(Language));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('getLanguages', () => {
        it('should return an array of categories', async () => {
            const repoSpy = jest.spyOn(repo, 'find');
            const categories = await service.getLanguages();
            expect(categories).toEqual(languageList);
            expect(repoSpy).toBeCalledTimes(1);
        });
    });
    describe('getLanguage', () => {
        it('should get one language', () => {
            const repoSpy = jest.spyOn(repo, 'findOne');
            expect(service.getLanguage(1)).resolves.toEqual(oneLanguage);
            expect(repoSpy).toBeCalledWith({ id: 1 });
        });
    });

    // TODO more tests
});
