
import { Connection, Repository, getConnection } from 'typeorm';
import { ICRUD } from '../baseRepository';
import { Quote } from '../../stock/entities/Quote';

export class QuoteRepo implements ICRUD<Quote> {
    delete(id: number): Promise<any> {
        throw new Error('Method not implemented.');
    }
    findAll(): Promise<Quote[]> {
        throw new Error('Method not implemented.');
    }
    findOne(id: number): Promise<Quote> {
        throw new Error('Method not implemented.');
    }
    findBy(options: any): Promise<Quote | Quote[]> {
        throw new Error('Method not implemented.');
    }
    async create(item: Quote): Promise<Quote> {
        delete item['ID'];
        return await this.QuoteRepo.save(item);
    }

    async  update(id: number, item: Quote): Promise<any> {
        throw new Error('Method not implemented.');
        // return await this.connection.createQueryBuilder()
        //     .update(Quote)
        //     .set({
        //         Name_CN: item.Name_CN,
        //     })
        //     .where('ID = :ID', { ID: id })
        //     .execute();
    }

    QuoteRepo: Repository<Quote>;

    constructor(private readonly connection: Connection) {
        this.QuoteRepo = connection.getRepository(Quote);
    }

}