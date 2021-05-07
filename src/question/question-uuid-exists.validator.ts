import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { QuestionService } from './question.service';

@ValidatorConstraint({ name: 'QuestionUuidExists', async: true })
@Injectable()
export class QuestionUuidExistsConstraint implements ValidatorConstraintInterface {
    constructor(private questionService: QuestionService) {}

    async validate(questionUuid: string) {
        return await this.questionService.questionUuidExists(questionUuid);
    }

    defaultMessage(args: ValidationArguments) {
        return `No related question with questionUuid "${args.value}" exists.`;
    }
}

export function QuestionUuidExists(validationOptions?: ValidationOptions) {
    return function (object: Record<string, any>, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: QuestionUuidExistsConstraint,
        });
    };
}
