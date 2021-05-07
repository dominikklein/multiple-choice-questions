import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Length } from 'class-validator';

@InputType()
export class CreateCategoryInput {
    @Length(1, 100)
    @Field()
    name: string;
}

@InputType()
export class UpdateCategoryInput extends PartialType(CreateCategoryInput) {}
