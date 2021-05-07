import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

export function Paginated<T>(classRef: Type<T>): any {
    @ObjectType({ isAbstract: true })
    abstract class PaginatedType {
        @Field((type) => [classRef], { nullable: true })
        nodes: T[];

        @Field((type) => Int)
        totalCount: number;
    }

    return PaginatedType;
}
