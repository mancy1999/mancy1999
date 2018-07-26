
import { Connection, Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { ICRUD } from '../../common/interface/baseRepository.interface';
import { buildChartUrl } from '../../core/infrastructure/utils/utils';
import { Analysis_Indicators_Detail } from '../../entities/Analysis_Indicators_Detail';

@Injectable()
export class AnalysisIndicatorsDetailService implements ICRUD<Analysis_Indicators_Detail> {
    async create(item: Analysis_Indicators_Detail): Promise<Analysis_Indicators_Detail> {
        return await this.analysisIndicatorsDetailRepository.save(item);
    }
    update(id: number, item: Analysis_Indicators_Detail): Promise<any> {
        throw new Error('Method not implemented.');
    }
    delete(id: number): Promise<any> {
        throw new Error('Method not implemented.');
    }
    findAll(): Promise<Analysis_Indicators_Detail[]> {
        throw new Error('Method not implemented.');
    }
    findOne(id: number): Promise<Analysis_Indicators_Detail> {
        throw new Error('Method not implemented.');
    }
    findBy(): Promise<Analysis_Indicators_Detail | Analysis_Indicators_Detail[]> {
        throw new Error('Method not implemented.');
    }

    async findByLatestRecords(): Promise<any> {
        let result = await this.connection.query('select * from  [dbo].[ViewLatestIndicators]');
        // result.forEach(x => {
        //     // hardcode logic here. for test
        //     x.MonthChart = buildChartUrl('6', '238', '12', x.Symbol, 5, '1');
        //     x.YearChart = buildChartUrl('6', '238', '12', x.Symbol, 9, '1');
        // });
        return result;
    }

    async findByLatestRecordsBySymbol(symbol: string): Promise<any> {
        let result = await this.connection.query(`select * from  [dbo].[ViewLatestIndicators] where symbol = '${symbol}'`);
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
        @Inject('AnalysisIndicatorsDetailRepositoryToken')
        private readonly analysisIndicatorsDetailRepository: Repository<Analysis_Indicators_Detail>) { }

}