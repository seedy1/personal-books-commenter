import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./Book";
import { Comments } from "./Comments";

/** Cahpter model. */
@Entity()
export class Chapters{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: "int", unique: true})
    chapter!: number;

    @Column({type: "text", nullable: true})
    description?: string;

    @CreateDateColumn()
    createdAt!: string;

    @ManyToOne( ()=> Book, book => book.personas)
    book!: Book;

    @OneToMany( () => Comments, comments => comments.chapter )
    comments?: Comments[];
}