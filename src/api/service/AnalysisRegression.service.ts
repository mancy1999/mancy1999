import { Connection, Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { ICRUD } from '../../common/interface/baseRepository.interface';
import { Analysis_Regression } from '../../entities/Analysis_Regression';
import { buildChartUrl } from '../../core/infrastructure/utils/utils';


@Injectable()
export class AnalysisRegressionService implements ICRUD<Analysis_Regression> {
    async create(item: Analysis_Regression): Promise<Analysis_Regression> {
        return await this.analysisRegressionRepository.save(item);
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
    findBy(): Promise<Analysis_Regression | Analysis_Regression[]> {
        throw new Error('Method not implemented.');
    }
    async findByLatestRecords(): Promise<any> {
        let result = await this.connection.query('select * from  [dbo].[ViewLatestRegression]');
        // result.forEach(x => {
        //     // hardcode logic here. for test
        //     x.MonthChart = buildChartUrl('6', '238', '12', x.Symbol, 5, '1');
        //     x.YearChart = buildChartUrl('6', '238', '12', x.Symbol, 9, '1');
        // });
        return result;
    }

    async findByLatestRecordsBySymbol(symbol: string): Promise<any> {
        let result = await this.connection.query(`select * from  [dbo].[ViewLatestRegression] where symbol = '${symbol}'`);
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
        @Inject('AnalysisRegressionRepositoryToken')
        private readonly analysisRegressionRepository: Repository<Analysis_Regression>) { }

}