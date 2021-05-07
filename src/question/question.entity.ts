import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    Generated,
    ManyToOne,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
} from 'typeorm';
import { Category } from '../category/category.entity';
import { Language } from '../language/language.entity';
import { QuestionDifficultyLevel } from './question-difficulty-level.enum';
import { QuestionStatus } from './question-status.enum';

@Entity()
@Unique('questionUuid_languageId', ['questionUuid', 'languageId'])
export class Question extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated('uuid')
    questionUuid: string;

    @Column()
    content: string;

    @Column('varchar', { length: 150 })
    answer1: string;

    @Column('varchar', { length: 150 })
    answer2: string;

    @Column('varchar', { length: 150 })
    answer3: string;

    @Column('varchar', { length: 150 })
    answer4: string;

    @Column('int')
    correctAnswer: number;

    // @ManyToOne((type) => Category, (category) => category.questions, { eager: false })
    @ManyToOne((type) => Category)
    category: Category;

    @Column()
    categoryId: number;

    // @ManyToOne((type) => Language, (language) => language.questions, { eager: false })
    @ManyToOne((type) => Language)
    language: Language;

    @Column()
    languageId: number;

    @Column('varchar', { length: 50 })
    status: QuestionStatus;

    @Column('int')
    difficultyLevel: QuestionDifficultyLevel;

    @CreateDateColumn()
    createTime: Date;

    @UpdateDateColumn()
    updateTime: Date;
}
