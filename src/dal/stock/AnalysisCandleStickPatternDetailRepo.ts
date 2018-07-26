import { Analysis_CandleStickPattern_Detail } from '../../entities/Analysis_CandleStickPattern_Detail';
import { Connection, Repository } from "typeorm";
import { ICRUD } from '../baseRepository';

export class AnalysisCandleStickPatternDetailRepo implements ICRUD<Analysis_CandleStickPattern_Detail> {
    AnalysisCandleStickPatternDetailRepo: Repository<Analysis_CandleStickPattern_Detail>

    async create(item: Analysis_CandleStickPattern_Detail): Promise<Analysis_CandleStickPattern_Detail> {
        return await this.AnalysisCandleStickPatternDetailRepo.save(item);
    }
    update(id: number, item: Analysis_CandleStickPattern_Detail): Promise<any> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<any> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<Analysis_CandleStickPattern_Detail[]> {
        throw new Error("Method not implemented.");
    }
    findOne(id: number): Promise<Analysis_CandleStickPattern_Detail> {
        throw new Error("Method not implemented.");
    }
    findBy(): Promise<Analysis_CandleStickPattern_Detail | Analysis_CandleStickPattern_Detail[]> {
        throw new Error("Method not implemented.");
    }
    async findByLatestRecords(): Promise<any> {
        return await this.connection.query('select * from  [dbo].[ViewLatestCandlesStickPattern]');
    }
    constructor(private readonly connection: Connection) {
        this.AnalysisCandleStickPatternDetailRepo = connection.getRepository(Analysis_CandleStickPattern_Detail);
    }

}