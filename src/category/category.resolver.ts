import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateCategoryInput, UpdateCategoryInput } from './category.input';
import { CategoryService } from './category.service';
import { CategoryType } from './category.type';

@Resolver((of) => CategoryType)
export class CategoryResolver {
    constructor(private categoryService: CategoryService) {}

    @Query((returns) => CategoryType)
    category(@Args('id', { type: () => Int }) id: number) {
        return this.categoryService.getCategory(id);
    }

    @Query((returns) => [CategoryType])
    categorys() {
        return this.categoryService.getCategorys();
    }

    @Mutation((returns) => CategoryType)
    createCategory(@Args('createCategoryInput') createCategoryInput: CreateCategoryInput) {
        return this.categoryService.createCategory(createCategoryInput);
    }

    @Mutation((returns) => CategoryType)
    updateCategory(
        @Args('id', { type: () => Int }) id: number,
        @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput
    ) {
        return this.categoryService.updateCategory(id, updateCategoryInput);
    }

    @Mutation((returns) => CategoryType)
    deleteCategory(@Args('id', { type: () => Int }) id: number) {
        return this.categoryService.deleteCategory(id);
    }
}
