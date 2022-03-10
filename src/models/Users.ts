import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { hash, genSalt, compare} from "bcryptjs";
import { Book } from "./Book";

@Entity()
export class Users{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: "varchar"})
    fullName!: string;

    @Column({type: "varchar", unique: true})
    email!: string;

    // TODO: add password length validator here
    @Column({type: "varchar"})
    password!: string;

    @CreateDateColumn()
    createdAt!: string;

    @OneToMany( ()=> Book, book=> book.user )
    books?: Book[];


    // set encrypt password before save and update 
    @BeforeInsert()
    @BeforeUpdate()
    private async hashPassword(){

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