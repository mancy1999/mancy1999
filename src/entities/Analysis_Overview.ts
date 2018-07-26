import { Index, Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, PrimaryGeneratedColumn } from "typeorm";


@Entity("Analysis_Overview", { schema: "dbo" })
export class Analysis_Overview {

    @PrimaryGeneratedColumn()
    ID: number;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "Symbol"
    })
    Symbol: string;


    @Column("int", {
        nullable: true,
        name: "CandleSticksDetailID"
    })
    CandleSticksDetailID: number;


    @Column("int", {
        nullable: true,
        name: "IndicatorsDetailID"
    })
    IndicatorsDetailID: number;


    @Column("int", {
        nullable: true,
        name: "TrendsDetailID"
    })
    TrendsDetailID: number;


    @Column("int", {
        nullable: true,
        name: "RegressionID"
    })
    RegressionID: number;


    @Column("datetime", {
        nullable: true,
        default: "(getdate())",
        name: "CreateDate"
    })
    CreateDate: Date;

}
