import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    fullName!: string;

    @Column({type: "varchar", unique: true})
    email!: string;

    @Column()
    password!: string;
    
    @Column({ type: 'varchar', unique: true, nullable: true })
    loginToken?: string;

    @CreateDateColumn()
    createdAt!: string;


    // set encrypt password before save

    // verify/decrypt password before login
};