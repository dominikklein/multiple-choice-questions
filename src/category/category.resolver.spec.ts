import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';
import { CategoryRepository } from './category.repository';

describe('CategoryResolver', () => {
    let resolver: CategoryResolver;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CategoryService, CategoryResolver, CategoryRepository],
        }).compile();

        resolver = module.get<CategoryResolver>(CategoryResolver);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });

    // TODO more tests
});
