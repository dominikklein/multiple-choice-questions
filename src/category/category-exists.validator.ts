import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { CategoryService } from './category.service';

@ValidatorConstraint({ name: 'CategoryExists', async: true })
@Injectable()
export class CategoryExistsConstraint implements ValidatorConstraintInterface {
    constructor(private categoryService: CategoryService) {}

    async validate(categoryId: number) {
        return await this.categoryService.categoryExists(categoryId);
    }

    defaultMessage(args: ValidationArguments) {
        return `Category with ID "${args.value}" doesn't exist.`;
    }
}

export function CategoryExists(validationOptions?: ValidationOptions) {
    return function (object: Record<string, any>, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: CategoryExistsConstraint,
        });
    };
}
