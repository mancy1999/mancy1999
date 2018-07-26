import { Index, Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, PrimaryGeneratedColumn } from "typeorm";


@Entity("Analysis_CandleStickPattern_Detail", { schema: "dbo" })
export class Analysis_CandleStickPattern_Detail {

    @PrimaryGeneratedColumn()
    ID: number;

    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "Symbol"
    })
    Symbol: string;


    @Column("bit", {
        nullable: true,
        name: "AbandonedBaby"
    })
    AbandonedBaby: boolean;


    @Column("bit", {
        nullable: true,
        name: "Bearishengulfingpattern"
    })
    Bearishengulfingpattern: boolean;


    @Column("bit", {
        nullable: true,
        name: "Bullishengulfingpattern"
    })
    Bullishengulfingpattern: boolean;


    @Column("bit", {
        nullable: true,
        name: "Darkcloudcover"
    })
    Darkcloudcover: boolean;


    @Column("bit", {
        nullable: true,
        name: "Downsidetasukigap"
    })
    Downsidetasukigap: boolean;


    @Column("bit", {
        nullable: true,
        name: "Doji"
    })
    Doji: boolean;


    @Column("bit", {
        nullable: true,
        name: "Dragonflydoji"
    })
    Dragonflydoji: boolean;


    @Column("bit", {
        nullable: true,
        name: "Gravestonedoji"
    })
    Gravestonedoji: boolean;


    @Column("bit", {
        nullable: true,
        name: "Bullishharami"
    })
    Bullishharami: boolean;


    @Column("bit", {
        nullable: true,
        name: "Bearishharamicross"
    })
    Bearishharamicross: boolean;


    @Column("bit", {
        nullable: true,
        name: "Bullishharamicross"
    })
    Bullishharamicross: boolean;


    @Column("bit", {
        nullable: true,
        name: "Bullishmarubozu"
    })
    Bullishmarubozu: boolean;


    @Column("bit", {
        nullable: true,
        name: "Bearishmarubozu"
    })
    Bearishmarubozu: boolean;


    @Column("bit", {
        nullable: true,
        name: "Eveningdojistar"
    })
    Eveningdojistar: boolean;


    @Column("bit", {
        nullable: true,
        name: "Eveningstar"
    })
    Eveningstar: boolean;


    @Column("bit", {
        nullable: true,
        name: "Bearishharami"
    })
    Bearishharami: boolean;


    @Column("bit", {
        nullable: true,
        name: "Piercingline"
    })
    Piercingline: boolean;


    @Column("bit", {
        nullable: true,
        name: "Bullishspinningtop"
    })
    Bullishspinningtop: boolean;


    @Column("bit", {
        nullable: true,
        name: "Bearishspinningtop"
    })
    Bearishspinningtop: boolean;


    @Column("bit", {
        nullable: true,
        name: "Morningdojistar"
    })
    Morningdojistar: boolean;


    @Column("bit", {
        nullable: true,
        name: "Morningstar"
    })
    Morningstar: boolean;


    @Column("bit", {
        nullable: true,
        name: "Threeblackcrows"
    })
    Threeblackcrows: boolean;


    @Column("bit", {
        nullable: true,
        name: "Threewhitesoldiers"
    })
    Threewhitesoldiers: boolean;


    @Column("datetime", {
        nullable: true,
        default: "(getdate())",
        name: "CreateDate"
    })
    CreateDate: Date;

}
