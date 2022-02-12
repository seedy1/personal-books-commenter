import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import {hashSync, hash, genSalt} from "bcryptjs";
// import { HASH_SALT } from "../lib/dotenv";

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
    private async hashPassword(){
        await console.log(this.password);
        
        // this.password = null;
        
        // this.password = hash(this.password, HASH_SALT); 
        // await hash(this.password, HASH_SALT, function(err, hash){
        //     console.log("GETTING HASH");
        //     console.log(hash);
        //     console.log("GETTING HASH ERROR");
        //     console.log(this.password);
        // });

        // const salt = await bcrypt.genSalt(10);
        const hash_salt = await genSalt(10);
        const hashedPassword = await hash(this.password, hash_salt);
        this.password = hashedPassword;

    }

    // verify/decrypt password before login
};