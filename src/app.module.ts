import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { GraphQLModule } from '@nestjs/graphql';
import { QuestionModule } from './question/question.module';
import { LanguageModule } from './language/language.module';
import { CategoryModule } from './category/category.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        GraphQLModule.forRoot({
            autoSchemaFile: true,
        }),
        QuestionModule,
        LanguageModule,
        CategoryModule,
    ],
})
export class AppModule {}
