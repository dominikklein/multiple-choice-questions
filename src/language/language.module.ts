import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguageExistsConstraint } from './language-exists.validator';
import { LanguageRepository } from './language.repository';
import { LanguageResolver } from './language.resolver';
import { LanguageService } from './language.service';

@Module({
    imports: [TypeOrmModule.forFeature([LanguageRepository])],
    providers: [LanguageResolver, LanguageService, LanguageExistsConstraint],
    exports: [LanguageService],
})
export class LanguageModule {}
