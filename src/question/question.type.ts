import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { QuestionStatus } from './question-status.enum';
import { QuestionDifficultyLevel } from './question-difficulty-level.enum';
import { CategoryType } from '../category/category.type';
import { LanguageType } from '../language/language.type';
import { Paginated } from '../common/pagination.generic.type';

@ObjectType('Question')
export class QuestionType {
    @Field((type) => Int)
    id: number;

    @Field((type) => ID)
    questionUuid: string;

    @Field()
    content: string;

    @Field()
    answer1: string;

    @Field()
    answer2: string;

    @Field()
    answer3: string;

    @Field()
    answer4: string;

    @Field((type) => Int)
    correctAnswer: number;

    @Field((type) => CategoryType)
    category: CategoryType;

    @Field((type) => LanguageType)
    language: LanguageType;

    @Field((type) => QuestionStatus)
    status: QuestionStatus;

    @Field((type) => QuestionDifficultyLevel)
    difficultyLevel: QuestionDifficultyLevel;

    @Field()
    createTime: Date;

    @Field()
    updateTime: Date;
}

@ObjectType('PaginatedQuestion')
export class PaginatedQuestionType extends Paginated(QuestionType) {}
