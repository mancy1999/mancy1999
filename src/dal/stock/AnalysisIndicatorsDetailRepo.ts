

import { Connection, Repository } from "typeorm";
import { ICRUD } from '../baseRepository';
import { Analysis_Indicators_Detail } from "../../entities/Analysis_Indicators_Detail";

export class AnalysisIndicatorsDetailRepo implements ICRUD<Analysis_Indicators_Detail> {
    AnalysisIndicatorsDetailRepo: Repository<Analysis_Indicators_Detail>
    async create(item: Analysis_Indicators_Detail): Promise<Analysis_Indicators_Detail> {
        delete item["ID"];
        return await this.AnalysisIndicatorsDetailRepo.save(item);
    }
    update(id: number, item: Analysis_Indicators_Detail): Promise<any> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<any> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<Analysis_Indicators_Detail[]> {
        throw new Error("Method not implemented.");
    }
    findOne(id: number): Promise<Analysis_Indicators_Detail> {
        throw new Error("Method not implemented.");
    }
    findBy(options: any): Promise<Analysis_Indicators_Detail | Analysis_Indicators_Detail[]> {
        throw new Error("Method not implemented.");
    }
    async findByLatestRecords(): Promise<any> {
        return await this.connection.query('select * from  [dbo].[ViewLatestIndicators]');
    }
    constructor(private readonly connection: Connection) {
        this.AnalysisIndicatorsDetailRepo = connection.getRepository(Analysis_Indicators_Detail);
    }
}

