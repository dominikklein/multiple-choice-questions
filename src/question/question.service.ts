import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationInput } from '../common/pagination.input';
import { Question } from './question.entity';
import { QuestionFilterInput } from './question.filter.input';
import { CreateQuestionInput, UpdateQuestionInput } from './question.input';
import { QuestionRepository } from './question.repository';

@Injectable()
export class QuestionService {
    constructor(
        @InjectRepository(QuestionRepository)
        private questionRepository: QuestionRepository
    ) {}

    async getQuestion(id: number): Promise<Question> {
        const question = await this.questionRepository.findOne({ id });

        if (!question) {
            throw new NotFoundException(`Question with ID "${id}" not found`);
        }

        return question;
    }

    async questionUuidExists(questionUuid: string): Promise<boolean> {
        const question = await this.questionRepository.findOne({ where: { questionUuid } });

        return !!question;
    }

    async getQuestionsByUuid(questionUuid: string): Promise<Question[]> {
        return await this.questionRepository.find({ where: { questionUuid } });
    }

    async getQuestions(
        questionFilterInput: QuestionFilterInput,
        paginationInput: PaginationInput
    ): Promise<[Question[], number]> {
        return await this.questionRepository.findAndCount({
            where: {
                ...questionFilterInput,
            },
            ...paginationInput,
        });
    }

    async createQuestion(createQuestionInput: CreateQuestionInput): Promise<Question> {
        const question = this.questionRepository.create(createQuestionInput);

        return await this.questionRepository.save(question);
    }

    async updateQuestion(id: number, updateQuestionInput: UpdateQuestionInput): Promise<Question> {
        const question = await this.getQuestion(id);

        return this.questionRepository.save({
            ...question,
            ...updateQuestionInput,
        });
    }

    async deleteQuestion(id: number): Promise<Question> {
        const question = await this.getQuestion(id);

        return await this.questionRepository.remove(question);
    }
}
