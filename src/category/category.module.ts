import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryRepository } from './category.repository';
import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';
import { CategoryExistsConstraint } from './category-exists.validator';

@Module({
    imports: [TypeOrmModule.forFeature([CategoryRepository])],
    providers: [CategoryResolver, CategoryService, CategoryExistsConstraint],
    exports: [CategoryService],
})
export class CategoryModule {}
