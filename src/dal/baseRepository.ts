export interface ICRUD<T> {
    create(item: T): Promise<T>;
    update(id: number, item: T): Promise<T | any>;
    delete(id: number): Promise<T | any>;
    findAll(): Promise<T[]>;
    findOne(id: number): Promise<T>;
    findBy(options: any): Promise<T | T[]>; // careful to use
}
