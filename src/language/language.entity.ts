import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
} from 'typeorm';
import { Question } from '../question/question.entity';

@Entity()
@Unique(['name', 'code'])
export class Language extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 200 })
    name: string;

    @Column('varchar', { length: 5 })
    code: string;

    @CreateDateColumn()
    createTime: Date;

    @UpdateDateColumn()
    updateTime: Date;

    @OneToMany((type) => Question, (question) => question.category, { eager: true })
    questions: Question[];
}
