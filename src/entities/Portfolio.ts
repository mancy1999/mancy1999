import {
    Index, Entity, PrimaryColumn, Column,
    OneToOne, OneToMany, ManyToOne, ManyToMany,
    JoinColumn, JoinTable, PrimaryGeneratedColumn,
} from 'typeorm';


@Entity('Portfolio', { schema: 'dbo' })
export class Portfolio {

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
        name: 'Type'
    })
    Type: string;

    @Column('datetime', {
        nullable: true,
        name: 'ActionDate'
    })
    ActionDate: Date;

    @Column('decimal', {
        nullable: true,
        precision: 18,
        scale: 2,
        name: 'Price'
    })
    Price: number;

    @Column('decimal', {
        nullable: true,
        precision: 18,
        scale: 2,
        name: 'Volume'
    })
    Volume: number;

    @Column('decimal', {
        nullable: true,
        precision: 18,
        scale: 2,
        name: 'Commission'
    })
    Commission: number;

    @Column('datetime', {
        nullable: true,
        default: '(getdate())',
        name: 'CreateDate'
    })
    CreateDate: Date;

}
