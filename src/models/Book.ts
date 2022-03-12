import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Chapters } from "./Chapters";
import { Personas } from "./Personas";
import { Users } from "./Users";
import { bookRating, Genres } from "../shared/constants";

// enum bookRating{
//     ONE = "ONE",
//     TWO = "TWO",
//     THREE = "THREE",
//     FOUR = "FOUR",
//     FIVE = "FIVE"
// }

// // use later
// enum Genres{
//     FICTION = "FICTION",
//     NON_FICTION = "NON_FICTION",
//     DRAMA = "DRAMA",
//     THRILLER = "THRILLER",
//     SCI_FI = "SCI_FI",
//     OTHERS = "OTHERS"
// }

// add unique for title
/** Book model */
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

    @ManyToOne( ()=> Users, users => users.books)
    user!: Users; // TODO: change to ! - required

    @OneToMany( ()=> Personas, personas => personas.book )
    personas?: Personas[];

    @OneToMany( ()=> Chapters, chapter => chapter.book )
    chapters?: Chapters[];

}