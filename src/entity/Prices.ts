import {Entity, Column, PrimaryGeneratedColumn, BeforeInsert, UpdateDateColumn, CreateDateColumn} from "typeorm";

@Entity("prices")
export class PriceElement {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar")
    "e1": string;

    @Column("int")
    "E":number;

    @Column("varchar")
    "s": string;

    @Column("int")
    "t1": number;


    @Column("varchar")
    "p": string;

    @Column("varchar")
    "q": string;

    @Column("int")
    "b": number;

    @Column("int")
    "a": number;

    @Column("int")
    "T": number;

    @Column("boolean")
    "m1": boolean;

    @Column("boolean")
    "M": boolean;
}
