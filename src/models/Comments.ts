import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Chapters } from "./Chapters";
import { Characters } from "./Characters";

@Entity()
export class Comments{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: "text"})
    comment!: string;

    @CreateDateColumn()
    createdAt!: string;

    // TODO: what to do?
    @ManyToMany( ()=> Chapters, chapters => chapters.comments)
    chapter?: Chapters;

    @ManyToMany( ()=> Characters, characters => characters.comments )
    character?: Characters;

}