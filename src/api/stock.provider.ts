import { Connection } from 'typeorm';
import { Analysis_CandleStickPattern_Detail } from '../entities/Analysis_CandleStickPattern_Detail';
import { Analysis_Indicators_Detail } from '../entities/Analysis_Indicators_Detail';
import { Analysis_Regression } from '../entities/Analysis_Regression';
import { Analysis_Pattern_Detail } from '../entities/Analysis_Pattern_Detail';
import { StockMaster } from '../entities/StockMaster';
import { Quote } from '../entities/Quote';

export const stockProviders = [
    {
        provide: 'AnalysisCandleStickPatternDetailRepositoryToken',
        useFactory: (connection: Connection) => connection.getRepository(Analysis_CandleStickPattern_Detail),
        inject: ['StockConnection'],
    },
    {
        provide: 'AnalysisIndicatorsDetailRepositoryToken',
        useFactory: (connection: Connection) => connection.getRepository(Analysis_Indicators_Detail),
        inject: ['StockConnection'],
    },
    {
        provide: 'AnalysisRegressionRepositoryToken',
        useFactory: (connection: Connection) => connection.getRepository(Analysis_Regression),
        inject: ['StockConnection'],
    },
    {
        provide: 'AnalysisPatternDetailRepositoryToken',
        useFactory: (connection: Connection) => connection.getRepository(Analysis_Pattern_Detail),
        inject: ['StockConnection'],
    },
    {
        provide: 'StockMasterRepositoryToken',
        useFactory: (connection: Connection) => connection.getRepository(StockMaster),
        inject: ['StockConnection'],
    },
    {
        provide: 'QuoteRepositoryToken',
        useFactory: (connection: Connection) => connection.getRepository(Quote),
        inject: ['StockConnection'],
    },
];
