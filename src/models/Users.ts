import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import {hashSync, hash, genSalt, compare} from "bcryptjs";
// import { HASH_SALT } from "../lib/dotenv";

@Entity()
export class Users{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: "varchar"})
    fullName!: string;

    // TODO: add email validator here
    @Column({type: "varchar", unique: true})
    email!: string;

    // TODO: add password length validator here
    @Column({type: "varchar"})
    password!: string;

    @Column({ type: 'varchar', unique: true, nullable: true })
    loginToken?: string;

    @CreateDateColumn()
    createdAt!: string;


    // set encrypt password before save
    @BeforeInsert()
    @BeforeUpdate()
    private async hashPassword(){
        // await console.log(this.password);

        const hash_salt = await genSalt(10);
        const hashedPassword = await hash(this.password, hash_salt);
        this.password = hashedPassword;

    }

    // verify/decrypt password before login
    public async checkPassword(_password: string){

        const isMatch = await compare(_password, this.password);
        return isMatch;
        
    }
}