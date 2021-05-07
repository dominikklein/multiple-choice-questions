import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { LanguageService } from './language.service';

@ValidatorConstraint({ name: 'LanguageExists', async: true })
@Injectable()
export class LanguageExistsConstraint implements ValidatorConstraintInterface {
    constructor(private languageService: LanguageService) {}

    async validate(languageId: number) {
        return await this.languageService.languageExists(languageId);
    }

    defaultMessage(args: ValidationArguments) {
        return `Language with ID "${args.value}" doesn't exist.`;
    }
}

export function LanguageExists(validationOptions?: ValidationOptions) {
    return function (object: Record<string, any>, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: LanguageExistsConstraint,
        });
    };
}
