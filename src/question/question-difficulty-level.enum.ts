import { registerEnumType } from '@nestjs/graphql';

export enum QuestionDifficultyLevel {
    EASY,
    MEDIUM,
    HARD,
}

registerEnumType(QuestionDifficultyLevel, {
    name: 'QuestionDifficultyLevel',
});
