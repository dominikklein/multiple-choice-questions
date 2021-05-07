import { Field, ID, InputType, Int, PartialType } from '@nestjs/graphql';
import { IsEnum, IsInt, IsOptional, IsUUID, Length, Max, Min, MinLength } from 'class-validator';
import { CategoryExists } from '../category/category-exists.validator';
import { LanguageExists } from '../language/language-exists.validator';
import { QuestionDifficultyLevel } from './question-difficulty-level.enum';
import { QuestionStatus } from './question-status.enum';
import { QuestionUuidExists } from './question-uuid-exists.validator';

@InputType()
export class CreateQuestionInput {
    @IsOptional()
    @IsUUID()
    @QuestionUuidExists()
    @Field((type) => ID, { nullable: true })
    questionUuid?: string;

    @MinLength(10)
    @Field()
    content: string;

    @Length(1, 150)
    @Field()
    answer1: string;

    @Length(1, 150)
    @Field()
    answer2: string;

    @Length(1, 150)
    @Field()
    answer3: string;

    @Length(1, 150)
    @Field()
    answer4: string;

    @IsInt()
    @Min(1)
    @Max(4)
    @Field()
    correctAnswer: number;

    @CategoryExists()
    @Field((type) => Int)
    categoryId: number;

    @LanguageExists()
    @Field((type) => Int)
    languageId: number;

    @IsOptional()
    @IsEnum(QuestionStatus)
    @Field({ nullable: true, defaultValue: QuestionStatus.NEW })
    status?: QuestionStatus;

    @IsEnum(QuestionDifficultyLevel)
    @Field()
    difficultyLevel: QuestionDifficultyLevel;
}

@InputType()
export class UpdateQuestionInput extends PartialType(CreateQuestionInput) {}
