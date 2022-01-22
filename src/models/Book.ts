import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Chapters } from "./Chapters";
import { Personas } from "./Personas";

enum bookRating{
    ONE = "ONE",
    TWO = "TWO",
    THREE = "THREE",
    FOUR = "FOUR",
    FIVE = "FIVE"
}

// use later
enum Genres{
    FICTION = "FICTION",
    NON_FICTION = "NON_FICTION",
    DRAMA = "DRAMA",
    THRILLER = "THRILLER",
    SCI_FI = "SCI_FI",
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

    @Column({type: "int", nullable: true})
    realeaseYear!: number;

    // create gerne table or enum?
    @Column({type: "enum", enum: Genres})
    genre!: Genres;

    @Column({type: "int"})
    pages!: number;

    @Column({type: "varchar", nullable: true})
    isbn?: string;

    @Column({type: "enum", enum: bookRating, nullable: true})
    rating?: bookRating;

    @CreateDateColumn()
    createdAt!: string;

    @OneToMany( ()=> Personas, personas => personas.book )
    characters?: Personas[];

    @OneToMany( ()=> Chapters, chapter => chapter.book )
    chapters?: Chapters[];

    // get IDA(): number {
    //     return this.id;
    //   }

}