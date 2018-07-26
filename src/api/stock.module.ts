import { Module, NestModule, UseFilters, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { DatabaseModule } from '../common/database/database.module';
import { LoggerMiddleware } from '../common/middileware/logger.middleware';
import { HttpExceptionFilter } from '../common/exception/exception.filter';
import { stockProviders } from './stock.provider';

import { AnalysisCandleStickPatternDetailService } from './service/AnalysisCandleStickPatternDetail.service';
import { AnalysisIndicatorsDetailService } from './service/AnalysisIndicatorsDetail.service';
import { AnalysisPatternDetailService } from './service/AnalysisPattern.service';
import { AnalysisRegressionService } from './service/AnalysisRegression.service';
import { QuoteStockMasterService } from './service/QuoteStockMaster.service';

import { TopController } from './controller/top.controller';
import { StockController } from './controller/stock.controller';
import { QuoteController } from './controller/quote.controller';
import { AnalysisController } from './controller/analysis.controller';

@Module({
    imports: [DatabaseModule],
    controllers: [
        AnalysisController,
        QuoteController,
        StockController,
        TopController,
    ],
    providers: [
        AnalysisCandleStickPatternDetailService,
        AnalysisIndicatorsDetailService,
        AnalysisPatternDetailService,
        AnalysisRegressionService,
        QuoteStockMasterService,
        ...stockProviders,
    ],
    exports: [...stockProviders],
})
export class StockModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void | MiddlewareConsumer {
        consumer.apply(LoggerMiddleware).forRoutes('*');
        // consumer.apply(passport.authenticate('jwt', { session: false }))
        //     .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}


