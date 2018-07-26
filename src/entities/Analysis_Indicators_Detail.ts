import { Index, Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, PrimaryGeneratedColumn } from "typeorm";


@Entity("Analysis_Indicators_Detail", { schema: "dbo" })
export class Analysis_Indicators_Detail {

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
        scale: 2,
        name: "ADL"
    })
    ADL: number;


    @Column("decimal", {
        nullable: true,
        precision: 18,
        scale: 2,
        name: "ADX_adx"
    })
    ADX_adx: number;


    @Column("decimal", {
        nullable: true,
        precision: 18,
        scale: 2,
        name: "ADX_pdi"
    })
    ADX_pdi: number;


    @Column("decimal", {
        nullable: true,
        precision: 18,
        scale: 2,
        name: "ADX_mdi"
    })
    ADX_mdi: number;


    @Column("decimal", {
        nullable: true,
        precision: 18,
        scale: 2,
        name: "ATR"
    })
    ATR: number;


    @Column("decimal", {
        nullable: true,
        precision: 18,
        scale: 2,
        name: "AO"
    })
    AO: number;


    @Column("decimal", {
        nullable: true,
        precision: 18,
        scale: 2,
        name: "BB_upper"
    })
    BB_upper: number;


    @Column("decimal", {
        nullable: true,
        precision: 18,
        scale: 2,
        name: "BB_middle"
    })
    BB_middle: number;


    @Column("decimal", {
        nullable: true,
        precision: 18,
        scale: 2,
        name: "BB_lower"
    })
    BB_lower: number;


    @Column("decimal", {
        nullable: true,
        precision: 18,
        scale: 2,
        name: "BB_pb"
    })
    BB_pb: number;


    @Column("decimal", {
        nullable: true,
        precision: 18,
        scale: 2,
        name: "CCI"
    })
    CCI: number;


    @Column("decimal", {
        nullable: true,
        precision: 18,
        scale: 2,
        name: "FI"
    })
    FI: number;


    @Column("decimal", {
        nullable: true,
        precision: 18,
        scale: 2,
        name: "KST"
    })
    KST: number;


    @Column("decimal", {
        nullable: true,
        precision: 18,
        scale: 2,
        name: "KST_signal"
    })
    KST_signal: number;


    @Column("decimal", {
        nullable: true,
        precision: 18,
        scale: 2,
        name: "MFI"
    })
    MFI: number;


    @Column("decimal", {
        nullable: true,
        precision: 18,
        scale: 2,
        name: "MACD"
    })
    MACD: number;


    @Column("decimal", {
        nullable: true,
        precision: 18,
        scale: 2,
        name: "MACD_signal"
    })
    MACD_signal: number;


    @Column("decimal", {
        nullable: true,
        precision: 18,
        scale: 2,
        name: "MACD_histogram"
    })
    MACD_histogram: number;


    @Column("decimal", {
        nullable: true,
        precision: 18,
        scale: 2,
        name: "OBV"
    })
    OBV: number;


    @Column("decimal", {
        nullable: true,
        precision: 18,
        scale: 2,
        name: "PSAR"
    })
    PSAR: number;


    @Column("decimal", {
        nullable: true,
        precision: 18,
        scale: 2,
        name: "ROC"
    })
    ROC: number;


    @Column("decimal", {
        nullable: true,
        precision: 18,
        scale: 2,
        name: "RSI"
    })
    RSI: number;


    @Column("decimal", {
        nullable: true,
        precision: 18,
        scale: 2,
        name: "SMA_14"
    })
    SMA_14: number;


    @Column("decimal", {
        nullable: true,
        precision: 18,
        scale: 2,
        name: "SMA_5"
    })
    SMA_5: number;


    @Column("decimal", {
        nullable: true,
        precision: 18,
        scale: 2,
        name: "SMA_10"
    })
    SMA_10: number;


    @Column("decimal", {
        nullable: true,
        precision: 18,
        scale: 2,
        name: "SMA_20"
    })
    SMA_20: number;


    @Column("decimal", {
        nullable: true,
        precision: 18,
        scale: 2,
        name: "SMA_50"
    })
    SMA_50: number;


    @Column("decimal", {
        nullable: true,
        precision: 18,
        scale: 2,
        name: "SMA_100"
    })
    SMA_100: number;


    @Column("decimal", {
        nullable: true,
        precision: 18,
        scale: 2,
        name: "SMA_250"
    })
    SMA_250: number;


    @Column("decimal", {
        nullable: true,
        precision: 18,
        scale: 2,
        name: "EMA_14"
    })
    EMA_14: number;


    @Column("decimal", {
        nullable: true,
        precision: 18,
        scale: 2,
        name: "EMA_5"
    })
    EMA_5: number;


    @Column("decimal", {
        nullable: true,
        precision: 18,
        scale: 2,
        name: "EMA_10"
    })
    EMA_10: number;


    @Column("decimal", {
        nullable: true,
        precision: 18,
        scale: 2,
        name: "EMA_20"
    })
    EMA_20: number;


    @Column("decimal", {
        nullable: true,
        precision: 18,
        scale: 2,
        name: "EMA_50"
    })
    EMA_50: number;


    @Column("decimal", {
        nullable: true,
        precision: 18,
        scale: 2,
        name: "EMA_100"
    })
    EMA_100: number;


    @Column("decimal", {
        nullable: true,
        precision: 18,
        scale: 2,
        name: "EMA_250"
    })
    EMA_250: number;


    @Column("decimal", {
        nullable: true,
        precision: 18,
        scale: 2,
        name: "WMA"
    })
    WMA: number;


    @Column("decimal", {
        nullable: true,
        precision: 18,
        scale: 2,
        name: "WEMA"
    })
    WEMA: number;


    @Column("decimal", {
        nullable: true,
        precision: 18,
        scale: 2,
        name: "Stochastic_k"
    })
    Stochastic_k: number;


    @Column("decimal", {
        nullable: true,
        precision: 18,
        scale: 2,
        name: "Stochastic_d"
    })
    Stochastic_d: number;


    @Column("decimal", {
        nullable: true,
        precision: 18,
        scale: 2,
        name: "TRIX"
    })
    TRIX: number;


    @Column("decimal", {
        nullable: true,
        precision: 18,
        scale: 2,
        name: "VWAP"
    })
    VWAP: number;


    @Column("decimal", {
        nullable: true,
        precision: 18,
        scale: 2,
        name: "VP_rangeStart"
    })
    VP_rangeStart: number;


    @Column("decimal", {
        nullable: true,
        precision: 18,
        scale: 2,
        name: "VP_rangeEnd"
    })
    VP_rangeEnd: number;


    @Column("decimal", {
        nullable: true,
        precision: 18,
        scale: 2,
        name: "VP_bullishVolume"
    })
    VP_bullishVolume: number;


    @Column("decimal", {
        nullable: true,
        precision: 18,
        scale: 2,
        name: "VP_bearishVolume"
    })
    VP_bearishVolume: number;


    @Column("decimal", {
        nullable: true,
        precision: 18,
        scale: 2,
        name: "VP_totalVolume"
    })
    VP_totalVolume: number;


    @Column("decimal", {
        nullable: true,
        precision: 18,
        scale: 2,
        name: "WR"
    })
    WR: number;


    @Column("datetime", {
        nullable: true,
        default: "(getdate())",
        name: "CreateDate"
    })
    CreateDate: Date;

}
