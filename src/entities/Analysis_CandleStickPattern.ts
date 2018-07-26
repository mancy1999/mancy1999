import { Index, Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, PrimaryGeneratedColumn } from "typeorm";


@Entity("Analysis_CandleStickPattern", { schema: "dbo" })
export class Analysis_CandleStickPattern {

    @PrimaryGeneratedColumn()
    ID: number;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "Name_Chin"
    })
    Name_Chin: string;


    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "Name_Eng"
    })
    Name_Eng: string;


    @Column("datetime", {
        nullable: true,
        default: "(getdate())",
        name: "TimeStamp"
    })
    TimeStamp: Date;


    @Column("int", {
        nullable: true,
        default: "((0))",
        name: "IsGood"
    })
    IsGood: number;


    @Column("int", {
        nullable: true,
        default: "((0))",
        name: "IsBad"
    })
    IsBad: number;

    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "FieldName"
    })
    FieldName: string;
}
