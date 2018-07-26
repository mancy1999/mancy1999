import { Index, Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, PrimaryGeneratedColumn } from "typeorm";


@Entity("Analysis_Pattern_Detail", { schema: "dbo" })
export class Analysis_Pattern_Detail {

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
        name: "hasDoubleBottom"
    })
    hasDoubleBottom: boolean;


    @Column("bit", {
        nullable: true,
        name: "hasDoubleTop"
    })
    hasDoubleTop: boolean;


    @Column("bit", {
        nullable: true,
        name: "hasHeadAndShoulder"
    })
    hasHeadAndShoulder: boolean;


    @Column("bit", {
        nullable: true,
        name: "hasInverseHeadAndShoulder"
    })
    hasInverseHeadAndShoulder: boolean;


    @Column("bit", {
        nullable: true,
        name: "isTrendingUp"
    })
    isTrendingUp: boolean;


    @Column("bit", {
        nullable: true,
        name: "isTrendingDown"
    })
    isTrendingDown: boolean;


    @Column("datetime", {
        nullable: true,
        default: "(getdate())",
        name: "CreateDate"
    })
    CreateDate: Date;

}
