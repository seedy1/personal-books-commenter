import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./Book";
import { Comments } from "./Comments";

@Entity()
export class Personas{
    // Characters is sql reserved and Cast so I used people in lack of a better name

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: "varchar", unique: true})
    characterName!: string;

    @Column({type: "text", nullable: true})
    description?: string;

    @CreateDateColumn()
    createdAt!: string;

    @ManyToOne( ()=> Book, book => book.chapters)
    book!: Book;

    @OneToMany( () => Comments, comments => comments.persona )
    comments?: Comments[];

}