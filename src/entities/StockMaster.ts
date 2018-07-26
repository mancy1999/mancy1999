import { Index, Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, PrimaryGeneratedColumn } from 'typeorm';


@Entity('StockMaster', { schema: 'dbo' })
export class StockMaster {

    @PrimaryGeneratedColumn()
    ID: number;

    @Column('nvarchar', {
        nullable: true,
        length: 50,
        name: 'Symbol'
    })
    Symbol: string;

    @Column('nvarchar', {
        nullable: true,
        length: 50,
        name: 'Symbol_Yahoo'
    })
    Symbol_Yahoo: string;

    @Column('nvarchar', {
        nullable: true,
        length: 50,
        name: 'Symbol_Aastock'
    })
    Symbol_Aastock: string;

    @Column('nvarchar', {
        nullable: true,
        length: 50,
        name: 'Name'
    })
    Name: string;


    @Column('nvarchar', {
        nullable: true,
        length: 50,
        name: 'Name_CN',
    })
    Name_CN: string;

    @Column('bit', {
        nullable: true,
        name: 'SHC'
    })
    SHC: boolean;

    @Column('bit', {
        nullable: true,
        name: 'SZC'
    })
    SZC: boolean;

    @Column('bit', {
        nullable: true,
        name: 'AH'
    })
    AH: boolean;

    @Column('bit', {
        nullable: true,
        name: 'MSCI'
    })
    MSCI: boolean;

    @Column('bit', {
        nullable: true,
        name: 'WATCH'
    })
    WATCH: boolean;

    @Column('bit', {
        nullable: true,
        name: 'SUSPEND'
    })
    SUSPEND: boolean;

    @Column('datetime', {
        nullable: true,
        default: '(getdate())',
        name: 'CreateDate'
    })
    CreateDate: Date;

    @Column('datetime', {
        nullable: true,
        name: 'EditDate'
    })
    EditDate: Date;

    @Column('bit', {
        nullable: true,
        name: 'IGNORE'
    })
    IGNORE: boolean;

    @Column('bit', {
        nullable: true,
        name: 'SB'
    })
    SB: boolean;

    @Column('bit', {
        nullable: true,
        name: 'GEM'
    })
    GEM: boolean;

    @Column('bit', {
        nullable: true,
        name: 'ETF'
    })
    ETF: boolean;

}
