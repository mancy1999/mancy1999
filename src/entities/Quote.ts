import {
    Index, Entity, PrimaryColumn, Column,
    OneToOne, OneToMany, ManyToOne, ManyToMany,
    JoinColumn, JoinTable, PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Quote', { schema: 'dbo' })
export class Quote {

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
        name: 'Symbol_Aastock'
    })
    Symbol_Aastock: string;

    @Column('decimal', {
        nullable: true,
        precision: 18,
        scale: 3,
        name: 'High'
    })
    High: number;

    @Column('decimal', {
        nullable: true,
        precision: 18,
        scale: 3,
        name: 'Low'
    })
    Low: number;

    @Column('decimal', {
        nullable: true,
        precision: 18,
        scale: 3,
        name: 'PrevClose'
    })
    PrevClose: number;

    @Column('decimal', {
        nullable: true,
        precision: 18,
        scale: 3,
        name: 'Open'
    })
    Open: number;

    @Column('decimal', {
        nullable: true,
        precision: 18,
        scale: 3,
        name: 'Last'
    })
    Last: number;

    @Column('decimal', {
        nullable: true,
        precision: 18,
        scale: 3,
        name: 'Change'
    })
    Change: number;

    @Column('decimal', {
        nullable: true,
        precision: 18,
        scale: 3,
        name: 'PctChange'
    })
    PctChange: number;

    @Column('decimal', {
        nullable: true,
        precision: 18,
        scale: 3,
        name: 'Volume'
    })
    Volume: number;

    @Column('decimal', {
        nullable: true,
        precision: 18,
        scale: 3,
        name: 'Turnover'
    })
    Turnover: number;

    @Column('decimal', {
        nullable: true,
        precision: 18,
        scale: 3,
        name: 'MarketCap'
    })
    MarketCap: number;

    @Column('datetime', {
        nullable: true,
        default: '(getdate())',
        name: 'LastUpdate'
    })
    LastUpdate: Date;

}
