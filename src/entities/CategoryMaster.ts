import {
    Index, Entity, PrimaryColumn, Column, OneToOne, OneToMany,
    ManyToOne, ManyToMany, JoinColumn, JoinTable, PrimaryGeneratedColumn,
} from 'typeorm';


@Entity('CategoryMaster', { schema: 'dbo' })
export class CategoryMaster {

    @PrimaryGeneratedColumn()
    ID: number;

    @Column('int', {
        nullable: true,
        default: '((0))',
        name: 'ParentID'
    })
    ParentID: number;


    @Column('nvarchar', {
        nullable: true,
        length: 50,
        name: 'Name'
    })
    Name: string;


    @Column('nvarchar', {
        nullable: true,
        length: 50,
        name: 'Desc'
    })
    Desc: string;


    @Column('datetime', {
        nullable: true,
        default: '(getdate())',
        name: 'TimeStamp'
    })
    TimeStap: Date;

}
