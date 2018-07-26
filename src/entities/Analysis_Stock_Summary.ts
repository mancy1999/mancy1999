import { Index, Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, PrimaryGeneratedColumn } from "typeorm";


@Entity("Analysis_Stock_Summary", { schema: "dbo" })
export class Analysis_Stock_Summary {

    @PrimaryGeneratedColumn()
    ID: number;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "Symbol"
    })
    Symbol: string;


    @Column("nvarchar", {
        nullable: true,
        length: 1000,
        name: "CandleSticks"
    })
    CandleSticks: string;


    @Column("nvarchar", {
        nullable: true,
        length: 1000,
        name: "Indicators"
    })
    Indicators: string;


    @Column("nvarchar", {
        nullable: true,
        length: 1000,
        name: "Trends"
    })
    Trends: string;


    @Column("nvarchar", {
        nullable: true,
        length: 1000,
        name: "Regression"
    })
    Regression: string;


    @Column("datetime", {
        nullable: true,
        default: "(getdate())",
        name: "CreateDate"
    })
    CreateDate: Date;

}
