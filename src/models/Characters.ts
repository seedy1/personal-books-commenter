import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./Book";
import { Comments } from "./Comments";

@Entity()
export class Characters{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: "varchar", unique: true})
    characterName!: string;

    @CreateDateColumn()
    createdAt!: string;

    @ManyToOne( ()=> Book, book => book.chapters)
    book!: Book;

    // comments
    @OneToMany( () => Comments, comments => comments.character )
    comments?: Comments[];

}