import { Args, ID, Int, Mutation, Query, ResolveField, Resolver, Parent } from '@nestjs/graphql';
import { CategoryService } from '../category/category.service';
import { PaginationInput } from '../common/pagination.input';
import { LanguageService } from '../language/language.service';
import { Question } from './question.entity';
import { QuestionFilterInput } from './question.filter.input';
import { CreateQuestionInput, UpdateQuestionInput } from './question.input';
import { QuestionService } from './question.service';
import { PaginatedQuestionType, QuestionType } from './question.type';

@Resolver((of) => QuestionType)
export class QuestionResolver {
    constructor(
        private questionService: QuestionService,
        private categoryService: CategoryService,
        private languageService: LanguageService
    ) {}

    @Query((returns) => QuestionType)
    question(@Args('id', { type: () => Int }) id: number) {
        return this.questionService.getQuestion(id);
    }

    @Query((returns) => [QuestionType])
    sameQuestions(@Args('questionUuid', { type: () => ID }) questionUuid: string) {
        return this.questionService.getQuestionsByUuid(questionUuid);
    }

    @Query((returns) => PaginatedQuestionType)
    async questions(
        @Args('questionFilterInput', { nullable: true }) questionFilterInput: QuestionFilterInput,
        @Args('paginationInput', { nullable: true }) paginationInput: PaginationInput
    ) {
        const [questions, totalCount] = await this.questionService.getQuestions(
            questionFilterInput,
            paginationInput
        );

        return {
            nodes: questions,
            totalCount: totalCount,
        };
    }

    @Mutation((returns) => QuestionType)
    createQuestion(@Args('createQuestionInput') createQuestionInput: CreateQuestionInput) {
        return this.questionService.createQuestion(createQuestionInput);
    }

    @Mutation((returns) => QuestionType)
    updateQuestion(
        @Args('id', { type: () => Int }) id: number,
        @Args('updateQuestionInput') updateQuestionInput: UpdateQuestionInput
    ) {
        return this.questionService.updateQuestion(id, updateQuestionInput);
    }

    @Mutation((returns) => QuestionType)
    deleteQuestion(@Args('id', { type: () => Int }) id: number) {
        return this.questionService.deleteQuestion(id);
    }

    @ResolveField()
    async category(@Parent() question: Question) {
        return await this.categoryService.getCategory(question.categoryId);
    }

    @ResolveField()
    async language(@Parent() question: Question) {
        return await this.languageService.getLanguage(question.languageId);
    }
}
