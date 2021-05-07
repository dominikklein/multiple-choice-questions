import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from '../category/category.module';
import { LanguageModule } from '../language/language.module';
import { QuestionUuidExistsConstraint } from './question-uuid-exists.validator';
import { QuestionRepository } from './question.repository';
import { QuestionResolver } from './question.resolver';
import { QuestionService } from './question.service';

@Module({
    imports: [TypeOrmModule.forFeature([QuestionRepository]), CategoryModule, LanguageModule],
    providers: [QuestionResolver, QuestionService, QuestionUuidExistsConstraint],
})
export class QuestionModule {}
