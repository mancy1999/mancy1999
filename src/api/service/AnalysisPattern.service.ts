
import { Connection, Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { ICRUD } from '../../common/interface/baseRepository.interface';
import { Analysis_Pattern_Detail } from '../../entities/Analysis_Pattern_Detail';
import { buildChartUrl } from '../../core/infrastructure/utils/utils';

@Injectable()
export class AnalysisPatternDetailService implements ICRUD<Analysis_Pattern_Detail> {
    async create(item: Analysis_Pattern_Detail): Promise<Analysis_Pattern_Detail> {
        return await this.analysisPatternDetailRepository.save(item);
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
    findBy(): Promise<Analysis_Pattern_Detail | Analysis_Pattern_Detail[]> {
        throw new Error('Method not implemented.');
    }
    async findByLatestRecords(): Promise<any> {
        let result = await this.connection.query('select * from  [dbo].[ViewLatestPattern]');
        // result.forEach(x => {
        //     // hardcode logic here. for test
        //     x.MonthChart = buildChartUrl('6', '238', '12', x.Symbol, 5, '1');
        //     x.YearChart = buildChartUrl('6', '238', '12', x.Symbol, 9, '1');
        // });
        return result;
    }

    async findByLatestRecordsBySymbol(symbol: string): Promise<any> {
        let result = await this.connection.query(`select * from  [dbo].[ViewLatestPattern] where symbol = '${symbol}'`);
        // result.forEach(x => {
        //     // hardcode logic here. for test
        //     x.MonthChart = buildChartUrl('6', '238', '12', x.Symbol, 5, '1');
        //     x.YearChart = buildChartUrl('6', '238', '12', x.Symbol, 9, '1');
        // });
        return result;
    }

    constructor(
        @Inject('StockConnection')
        private readonly connection: Connection,
        @Inject('AnalysisPatternDetailRepositoryToken')
        private readonly analysisPatternDetailRepository: Repository<Analysis_Pattern_Detail>) { }

}