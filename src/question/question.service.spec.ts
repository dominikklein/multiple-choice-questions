import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionDifficultyLevel } from './question-difficulty-level.enum';
import { QuestionStatus } from './question-status.enum';
import { Question } from './question.entity';
import { QuestionService } from './question.service';

const oneQuestion = {
    id: 1,
    content: 'Example question?',
    answer1: 'One',
    answer2: 'Two',
    answer3: 'Three',
    answer4: 'Four',
    correctAnswer: 3,
    status: QuestionStatus.NEW,
    difficultyLevel: QuestionDifficultyLevel.EASY,
};

const questionList = [
    oneQuestion,
    {
        id: 2,
        content: 'Other example question?',
        answer1: 'One',
        answer2: 'Two',
        answer3: 'Three',
        answer4: 'Four',
        correctAnswer: 2,
        status: QuestionStatus.REVIEWED,
        difficultyLevel: QuestionDifficultyLevel.HARD,
    },
];

describe('QuestionService', () => {
    let service: QuestionService;
    let repo: Repository<Question>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                QuestionService,
                {
                    provide: getRepositoryToken(Question),
                    useValue: {
                        findAndCount: jest.fn().mockResolvedValue([questionList, 2]),
                        findOne: jest.fn().mockResolvedValue(oneQuestion),
                        create: jest.fn().mockReturnValue(oneQuestion),
                        save: jest.fn().mockReturnValue(oneQuestion),
                        // as these do not actually use their return values in our sample
                        // we just make sure that their resolve is true to not crash
                        update: jest.fn().mockResolvedValue(oneQuestion),
                        // as these do not actually use their return values in our sample
                        // we just make sure that their resolve is true to not crash
                        remove: jest.fn().mockResolvedValue(oneQuestion),
                    },
                },
            ],
        }).compile();

        service = module.get<QuestionService>(QuestionService);
        repo = module.get<Repository<Question>>(getRepositoryToken(Question));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('questions', () => {
        it('should return an array of categories', async () => {
            const repoSpy = jest.spyOn(repo, 'findAndCount');
            const categories = await service.getQuestions(null, null);
            expect(categories).toEqual([questionList, 2]);
            expect(repoSpy).toBeCalledWith({ where: {} });
        });
    });
    describe('getQuestion', () => {
        it('should get one question', () => {
            const repoSpy = jest.spyOn(repo, 'findOne');
            expect(service.getQuestion(1)).resolves.toEqual(oneQuestion);
            expect(repoSpy).toBeCalledWith({ id: 1 });
        });
    });

    // TODO more tests
});
