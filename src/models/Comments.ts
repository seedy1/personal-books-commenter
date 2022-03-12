import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Chapters } from "./Chapters";
import { Personas } from "./Personas";

/** Comments model */
@Entity()
export class Comments{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: "text"})
    comment!: string;

    @CreateDateColumn()
    createdAt!: string;

    @ManyToOne( ()=> Chapters, chapters => chapters.comments)
    chapter?: Chapters;

    @ManyToOne( ()=> Personas, personas => personas.comments )
    persona?: Personas;

}