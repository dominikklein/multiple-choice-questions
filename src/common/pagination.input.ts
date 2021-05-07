import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class PaginationInput {
    @Field((type) => Int, { nullable: true, defaultValue: 0 })
    skip: number;

    @Field((type) => Int, { nullable: true, defaultValue: 10 })
    take: number;
}
