import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import {hashSync, hash} from "bcryptjs";
import { HASH_SALT } from "../lib/dotenv";

@Entity()
export class Users{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: "varchar"})
    fullName!: string;

    @Column({type: "varchar", unique: true})
    email!: string;

    @Column({type: "varchar"})
    password!: string;

    @Column({ type: 'varchar', unique: true, nullable: true })
    loginToken?: string;

    @CreateDateColumn()
    createdAt!: string;


    // set encrypt password before save
    @BeforeInsert()
    @BeforeUpdate()
    hashPassword(){
        console.log(this.password);
        
        hash(this.password, HASH_SALT, function(err, hash){
            console.log("GETTING HASH");
            console.log(hash);
            
        });

    }

    // verify/decrypt password before login
};