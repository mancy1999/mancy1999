import {
    Controller, HttpCode, Get, Param, Body, Post,
    NotFoundException, UseFilters, Delete, BadRequestException, Inject, InternalServerErrorException,
} from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { isNumber } from 'util';
import { HttpExceptionFilter } from '../../common/exception/exception.filter';
import { QuoteStockMasterService } from '../service/QuoteStockMaster.service';
import { QuoteVariableType, QuoteStockType, QuoteCategoryType } from '../../core/infrastructure/enum/QuoteType.enum';

@ApiUseTags('top')
@Controller('top')
@UseFilters(new HttpExceptionFilter())
export class TopController {
    constructor(private quoteStockMasterService: QuoteStockMasterService) {
    }
    // stock_type enum QuoteStockType
    // GEM = 'gem',
    // SB = 'sb',
    // ETF = 'etf',
    // IGNORE = 'ignore',
    // SHC = 'shc',
    // SZC = 'szc',
    // AH = 'ah',

    // type
    // rise/drop/volume/turnover/ 
    @Get(':stock_type/:type/:count')
    async findStock(@Param() params: any) {
        try {
            let count = Number(params.count);
            if (!(count && isNumber(count))) {
                count = 10;
            }
            let stock_type = params.stock_type;
            // if (stock_type in QuoteStockType) {

            // } else {
            //     throw new InternalServerErrorException('invalid stock type');
            // }
            let type = params.type;
            let orderBy = 'desc';
            let quoteVariableType = QuoteVariableType.PctChange;

            if (type == QuoteCategoryType.DROP) {
                orderBy = 'asc';
            }
            if (type == QuoteCategoryType.TURNOVER) {
                quoteVariableType = QuoteVariableType.Turnover;
            }
            if (type == QuoteCategoryType.VOLUME) {
                quoteVariableType = QuoteVariableType.Volume;
            }
            return await this.quoteStockMasterService.findTop(count, quoteVariableType, orderBy, stock_type);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Get('sb/rise/:count')
    async findSBTopRise(@Param() params: any) {
        try {
            let count = Number(params.count);
            if (!(count && isNumber(count))) {
                count = 10;
            }
            return await this.quoteStockMasterService.findTop(params.count, QuoteVariableType.PctChange, 'desc', 'sb');
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Get('gem/rise/:count')
    async findGEMTopRise(@Param() params: any) {
        try {
            let count = Number(params.count);
            if (!(count && isNumber(count))) {
                count = 10;
            }
            return await this.quoteStockMasterService.findTop(params.count, QuoteVariableType.PctChange, 'desc', 'gem');
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Get('sb/drop/:count')
    async findSBTopDrop(@Param() params: any) {
        try {
            let count = Number(params.count);
            if (!(count && isNumber(count))) {
                count = 10;
            }
            return await this.quoteStockMasterService.findTop(count, QuoteVariableType.PctChange, 'asc', 'sb');
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Get('gem/drop/:count')
    async findGEMTopDrop(@Param() params: any) {
        try {
            let count = Number(params.count);
            if (!(count && isNumber(count))) {
                count = 10;
            }
            return await this.quoteStockMasterService.findTop(count, QuoteVariableType.PctChange, 'asc', 'gem');
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Get('sb/volume/:count')
    async findSBTopVolume(@Param() params: any) {
        try {
            let count = Number(params.count);
            if (!(count && isNumber(count))) {
                count = 10;
            }
            return await this.quoteStockMasterService.findTop(count, QuoteVariableType.Volume, 'desc', 'sb');
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Get('gem/volume/:count')
    async findGEMTopVolume(@Param() params: any) {
        try {
            let count = Number(params.count);
            if (!(count && isNumber(count))) {
                count = 10;
            }
            return await this.quoteStockMasterService.findTop(count, QuoteVariableType.Volume, 'desc', 'gem');
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Get('sb/turnover/:count')
    async findSBTopturnover(@Param() params: any) {
        try {
            let count = Number(params.count);
            if (!(count && isNumber(count))) {
                count = 10;
            }
            return await this.quoteStockMasterService.findTop(count, QuoteVariableType.Turnover, 'desc', 'sb');

        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Get('gem/turnover/:count')
    async findGEMTopturnover(@Param() params: any) {
        try {
            let count = Number(params.count);
            if (!(count && isNumber(count))) {
                count = 10;
            }
            return await this.quoteStockMasterService.findTop(count, QuoteVariableType.Turnover, 'desc', 'gem');
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
