
import {
    Controller, HttpCode, Get, Param, Body, Post,
    NotFoundException, UseFilters, Delete, BadRequestException,
} from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'common/exception/exception.filter';
import { ImporterClass } from '../../core/infrastructure/importer/import';
import { QuoteListDto } from '../../core/infrastructure/model/quote.dto.model';
import { ConvertDateToYYYYMMDD, getAmplitude, getPerformance } from '../../core/infrastructure/utils/utils';
import { Period } from '../../core/infrastructure/enum/Periodd';
import { ICandlesTick } from '../../core/infrastructure/model/stock.model';
import { quoteType } from '../../core/infrastructure/importer/yahoo/quote/enum/quoteType';

@ApiUseTags('quote')
@Controller('quote')
@UseFilters(new HttpExceptionFilter())
export class QuoteController {
    constructor() {
    }

    @HttpCode(200)
    @Get('aastock/:Symbol')
    async find_aastock_quote(@Param() params: any) {
        try {
            let _importer: any = new ImporterClass('aastock');
            return await _importer.quote(params.Symbol);
        } catch (error) {
            return new BadRequestException(error);
        }
    }

    @HttpCode(200)
    @Post('aastock')
    async find_aastock_quote_list(@Body() symbolList: QuoteListDto) {
        try {
            if (Array.isArray(symbolList.Symbols)) {
                let f = symbolList.Symbols.map(async x => {
                    let _importer: any = new ImporterClass('aastock');
                    return await _importer.quote(x);
                });
                return await Promise.all(f);
            } else {
                return new BadRequestException('Invalid Quote List');
            }
        } catch (error) {
            return new BadRequestException(error);
        }
    }

    @HttpCode(200)
    @Get('yahoo/:Symbol')
    async find_yahoo_quote(@Param() params: any) {
        try {
            let _importer: any = new ImporterClass('yahoo');
            return await _importer.quote(params.Symbol);
        } catch (error) {
            return new BadRequestException(error);
        }
    }

    @HttpCode(200)
    @Get('yahoo_history/:Symbol')
    async find_yahoo_history(@Param() params: any) {
        try {
            let _importer: any = new ImporterClass('yahoo');
            return await _importer.quoteHistory(params.Symbol);
        } catch (error) {
            return new BadRequestException(error);
        }
    }

    // 波幅
    @HttpCode(200)
    @Get('overview/:Symbol')
    async find_amplitude(@Param() params: any) {
        try {
            // assume the symbol work correctly.
            let yahoo_importer = new ImporterClass('yahoo');
            let now = new Date();
            let toDate = ConvertDateToYYYYMMDD(now);
            now.setFullYear(now.getFullYear() - 1);
            let fromDate = ConvertDateToYYYYMMDD(now);

            let modules = [
                quoteType.defaultKeyStatistics,
                quoteType.earnings,
                quoteType.financialData,
                quoteType.price,
                quoteType.summaryDetail,
            ];

            let yahoo_quote = await yahoo_importer.quote(`${params.Symbol}.HK`, modules);
            let _history: ICandlesTick[] = await yahoo_importer.quoteHistory(`${params.Symbol}.HK`, fromDate, toDate, Period.daily);
            let amplitude_result = await getAmplitude(_history);
            let performance_result = await getPerformance(_history);
            let aastock_importer = new ImporterClass('aastock');
            let aastock_quote = await aastock_importer.quote(params.Symbol, null);

            return {
                Symbol: params.Symbol,
                amplitude: amplitude_result,
                performance: performance_result,
                quote: aastock_quote,
                history: _history,
                summaryDetail: yahoo_quote.summaryDetail,
                defaultKeyStatistics: yahoo_quote.defaultKeyStatistics,
                earnings: yahoo_quote.earnings,
                price: yahoo_quote.price,
                financialData: yahoo_quote.financialData,
            };
        } catch (error) {
            console.log(error);
            return new BadRequestException(error);
        }
    }
}




