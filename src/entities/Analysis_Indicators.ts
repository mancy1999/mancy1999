import {
    Index, Entity, PrimaryColumn, Column, OneToOne, OneToMany,
    ManyToOne, ManyToMany, JoinColumn, JoinTable, PrimaryGeneratedColumn
} from "typeorm";

@Entity("Analysis_Indicators", { schema: "dbo" })
export class Analysis_Indicators {
    @PrimaryGeneratedColumn()
    ID: number;

    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "Code"
    })
    Code: string;

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
}
