
import { Connection, Repository } from 'typeorm';
import { ICRUD } from '../../common/interface/baseRepository.interface';
import { Injectable, Inject } from '@nestjs/common';
import { Analysis_CandleStickPattern_Detail } from '../../entities/Analysis_CandleStickPattern_Detail';
import { buildChartUrl } from '../../core/infrastructure/utils/utils';
@Injectable()
export class AnalysisCandleStickPatternDetailService implements ICRUD<Analysis_CandleStickPattern_Detail> {
    async create(item: Analysis_CandleStickPattern_Detail): Promise<Analysis_CandleStickPattern_Detail> {
        return await this.analysisCandleStickPatternDetailRepository.save(item);
    }
    update(id: number, item: Analysis_CandleStickPattern_Detail): Promise<any> {
        throw new Error('Method not implemented.');
    }
    delete(id: number): Promise<any> {
        throw new Error('Method not implemented.');
    }
    findAll(): Promise<Analysis_CandleStickPattern_Detail[]> {
        throw new Error('Method not implemented.');
    }
    findOne(id: number): Promise<Analysis_CandleStickPattern_Detail> {
        throw new Error('Method not implemented.');
    }
    findBy(): Promise<Analysis_CandleStickPattern_Detail | Analysis_CandleStickPattern_Detail[]> {
        throw new Error('Method not implemented.');
    }

    async findCandlesStickMaster() {
        return await this.connection.query('select *  from  [dbo].[Analysis_CandleStickPattern]');
    }

    async findByLatestRecords(): Promise<any> {
        let result: any[] = await this.connection.query('select * from  [dbo].[ViewLatestCandlesStickPattern]');
        return result;
    }

    async findByLatestRecordsBySymbol(symbol: string): Promise<any> {
        let result = await this.connection.query(`select * from  [dbo].[ViewLatestCandlesStickPattern] where symbol = '${symbol}'`);
        return result;
    }

    async findByLatestRecordsByCancldesName(candlesName: string): Promise<any> {
        let result = await this.connection.query(`select * from  [dbo].[ViewLatestCandlesStickPattern] where ${candlesName} = 1 `);
        return result;
    }

    constructor(
        @Inject('StockConnection')
        private readonly connection: Connection,
        @Inject('AnalysisIndicatorsDetailRepositoryToken')
        private readonly analysisCandleStickPatternDetailRepository: Repository<Analysis_CandleStickPattern_Detail>) { }

}