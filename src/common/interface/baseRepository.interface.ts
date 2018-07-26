import { IWrite } from './write.interface';
import { IRead } from './read.interface';
import { UpdateResult, DeleteResult } from 'typeorm';


// that class only can be extended
// @injectable()
export interface IBaseCRUD<T> extends IWrite<T>, IRead<T> {

}

export interface ICRUD<T> {
    create(item: T): Promise<T>;
    update(id: number, item: T): Promise<T | UpdateResult>;
    delete(id: number): Promise<T | DeleteResult>;
    findAll(): Promise<T[]>;
    findOne(id: number): Promise<T>;
    findBy(options: any): Promise<T | T[]>; // careful to use
}
