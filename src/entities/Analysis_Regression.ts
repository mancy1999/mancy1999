import { Index, Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, PrimaryGeneratedColumn } from "typeorm";


@Entity("Analysis_Regression", { schema: "dbo" })
export class Analysis_Regression {

    @PrimaryGeneratedColumn()
    ID: number;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "Symbol"
    })
    Symbol: string;


    @Column("decimal", {
        nullable: true,
        precision: 18,
        scale: 6,
        name: "gradient"
    })
    gradient: number;


    @Column("decimal", {
        nullable: true,
        precision: 18,
        scale: 6,
        name: "yIntercept"
    })
    yIntercept: number;


    @Column("datetime", {
        nullable: true,
        default: "(getdate())",
        name: "CreateDate"
    })
    CreateDate: Date;

}
