import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class QuestionFilterInput {
    @Field((type) => Int, { nullable: true })
    languageId: number;

    @Field((type) => Int, { nullable: true })
    categoryId: number;
}
