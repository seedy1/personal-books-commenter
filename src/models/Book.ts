import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Chapters } from "./Chapters";
import { Characters } from "./Characters";

enum bookRating{
    ONE = "one",
    TWO = "two",
    THREE = "three",
    FOUR = "four",
    FIVE = "five"
}

// use later
enum Genres{
    FICTION = "FICTION",
    NONFICTION = "NON-FICTION",
    DRAMA = "DRAMA",
    THRILLER = "THRILLER",
    SCIFI = "SCI-FI",
    OTHERS = "OTHERS"
}

// add unique for title
@Entity()
export class Book{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: "varchar", unique: true})
    title!: string;

    @Column({type: "varchar"})
    author!: string;

    @Column({type: "varchar", nullable: true})
    realeaseYear!: string;

    // create gerne table or enum?
    @Column({type: "varchar"})
    genre!: string;

    @Column({type: "int"})
    pages!: number;

    @Column({type: "varchar", nullable: true})
    isbn?: string;

    @Column({type: "enum", enum: bookRating, nullable: true})
    rating?: bookRating;

    @CreateDateColumn()
    createdAt!: string;

    @OneToMany( ()=> Characters, characters => characters.book )
    characters?: Characters[];

    @OneToMany( ()=> Chapters, chapter => chapter.book )
    chapters?: Chapters[];

}