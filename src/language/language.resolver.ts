import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LanguageExists } from './language-exists.validator';
import { CreateLanguageInput, UpdateLanguageInput } from './language.input';
import { LanguageService } from './language.service';
import { LanguageType } from './language.type';

@Resolver((of) => LanguageType)
export class LanguageResolver {
    constructor(private languageService: LanguageService) {}

    @Query((returns) => LanguageType)
    language(@Args('id', { type: () => Int }) id: number) {
        return this.languageService.getLanguage(id);
    }

    @Query((returns) => [LanguageType])
    languages() {
        return this.languageService.getLanguages();
    }

    @Mutation((returns) => LanguageType)
    createLanguage(@Args('createLanguageInput') createLanguageInput: CreateLanguageInput) {
        return this.languageService.createLanguage(createLanguageInput);
    }

    @Mutation((returns) => LanguageType)
    updateLanguage(
        @Args('id', { type: () => Int }) id: number,
        @Args('updateLanguageInput') updateLanguageInput: UpdateLanguageInput
    ) {
        return this.languageService.updateLanguage(id, updateLanguageInput);
    }

    @Mutation((returns) => LanguageType)
    deleteLanguage(@Args('id', { type: () => Int }) id: number) {
        return this.languageService.deleteLanguage(id);
    }
}
