import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Length } from 'class-validator';

@InputType()
export class CreateLanguageInput {
    @Length(1, 200)
    @Field()
    name: string;

    @Length(2, 5)
    @Field()
    code: string;
}

@InputType()
export class UpdateLanguageInput extends PartialType(CreateLanguageInput) {}
