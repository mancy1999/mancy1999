import { Analysis_Regression } from './../../entities/Analysis_Regression';
import { Analysis_Pattern_Detail } from './../../entities/Analysis_Pattern_Detail';


import { Connection, Repository } from 'typeorm';
import { ICRUD } from '../baseRepository';

export class AnalysisRegressionRepo implements ICRUD<Analysis_Regression> {
    async create(item: Analysis_Regression): Promise<Analysis_Regression> {
        delete item['ID'];
        return await this.AnalysisRegressionRepo.save(item);
    }
    update(id: number, item: Analysis_Regression): Promise<any> {
        throw new Error('Method not implemented.');
    }
    delete(id: number): Promise<any> {
        throw new Error('Method not implemented.');
    }
    findAll(): Promise<Analysis_Regression[]> {
        throw new Error('Method not implemented.');
    }
    findOne(id: number): Promise<Analysis_Regression> {
        throw new Error('Method not implemented.');
    }
    findBy(options: any): Promise<Analysis_Regression | Analysis_Regression[]> {
        throw new Error('Method not implemented.');
    }
    async findByLatestRecords(): Promise<any> {
        return await this.connection.query('select * from  [dbo].[ViewLatestRegression]');
    }
    AnalysisRegressionRepo: Repository<Analysis_Regression>

    constructor(private readonly connection: Connection) {
        this.AnalysisRegressionRepo = connection.getRepository(Analysis_Regression);
    }

}