import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('Category')
export class CategoryType {
    @Field((type) => Int)
    id: number;

    @Field()
    name: string;

    @Field()
    createTime: Date;

    @Field()
    updateTime: Date;
}
