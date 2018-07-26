import { Analysis_Pattern_Detail } from './../../entities/Analysis_Pattern_Detail';


import { Connection, Repository } from 'typeorm';
import { ICRUD } from '../baseRepository';

export class AnalysisPatternRepo implements ICRUD<Analysis_Pattern_Detail> {
    async create(item: Analysis_Pattern_Detail): Promise<Analysis_Pattern_Detail> {
        delete item['ID'];
        return await this.AnalysisPatternDetailRepo.save(item);
    }
    update(id: number, item: Analysis_Pattern_Detail): Promise<any> {
        throw new Error('Method not implemented.');
    }
    delete(id: number): Promise<any> {
        throw new Error('Method not implemented.');
    }
    findAll(): Promise<Analysis_Pattern_Detail[]> {
        throw new Error('Method not implemented.');
    }
    findOne(id: number): Promise<Analysis_Pattern_Detail> {
        throw new Error('Method not implemented.');
    }
    findBy(options: any): Promise<Analysis_Pattern_Detail | Analysis_Pattern_Detail[]> {
        throw new Error('Method not implemented.');
    }
    async findByLatestRecords(): Promise<any> {
        return await this.connection.query('select * from  [dbo].[ViewLatestPattern]');
    }
    AnalysisPatternDetailRepo: Repository<Analysis_Pattern_Detail>;

    constructor(private readonly connection: Connection) {
        this.AnalysisPatternDetailRepo = connection.getRepository(Analysis_Pattern_Detail);
    }

}