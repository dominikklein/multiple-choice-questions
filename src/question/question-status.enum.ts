import { registerEnumType } from '@nestjs/graphql';

export enum QuestionStatus {
    NEW = 'NEW',
    IN_REVIEW = 'IN_REVIEW',
    REVIEWED = 'REVIEWED',
    PUBLIC = 'PUBLIC',
}

registerEnumType(QuestionStatus, {
    name: 'QuestionStatus',
});
