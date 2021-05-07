import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CategoryService } from './category.service';

const oneCategory = {
    id: 1,
    name: 'Example',
};

const categoryList = [
    oneCategory,
    {
        id: 2,
        name: 'Dummy',
    },
];

describe('CategoryService', () => {
    let service: CategoryService;
    let repo: Repository<Category>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CategoryService,
                {
                    provide: getRepositoryToken(Category),
                    useValue: {
                        find: jest.fn().mockResolvedValue(categoryList),
                        findOne: jest.fn().mockResolvedValue(oneCategory),
                        create: jest.fn().mockReturnValue(oneCategory),
                        save: jest.fn().mockReturnValue(oneCategory),
                        // as these do not actually use their return values in our sample
                        // we just make sure that their resolve is true to not crash
                        update: jest.fn().mockResolvedValue(oneCategory),
                        // as these do not actually use their return values in our sample
                        // we just make sure that their resolve is true to not crash
                        remove: jest.fn().mockResolvedValue(oneCategory),
                    },
                },
            ],
        }).compile();

        service = module.get<CategoryService>(CategoryService);
        repo = module.get<Repository<Category>>(getRepositoryToken(Category));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('getCategorys', () => {
        it('should return an array of categories', async () => {
            const repoSpy = jest.spyOn(repo, 'find');
            const categories = await service.getCategorys();
            expect(categories).toEqual(categoryList);
            expect(repoSpy).toBeCalledTimes(1);
        });
    });
    describe('getCategory', () => {
        it('should get one category', () => {
            const repoSpy = jest.spyOn(repo, 'findOne');
            expect(service.getCategory(1)).resolves.toEqual(oneCategory);
            expect(repoSpy).toBeCalledWith({ id: 1 });
        });
    });

    // TODO more tests
});
