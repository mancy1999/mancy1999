import {
    Controller, HttpCode, Get, Param, Body, Post,
    NotFoundException, UseFilters, Delete, BadRequestException, Inject, InternalServerErrorException, Put,
} from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../../common/exception/exception.filter';
import { QuoteStockMasterService } from '../service/QuoteStockMaster.service';

@ApiUseTags('stock')
@Controller('stock')
@UseFilters(new HttpExceptionFilter())
export class StockController {
    constructor(private quoteStockMasterService: QuoteStockMasterService) {
    }

    @Get('watch/subscribe/:symbol')
    async subscribeToWatch(@Param() params: any) {
        try {
            return await this.quoteStockMasterService.subscribeToWatch(params.symbol);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Get('watch/unsubscribe/:symbol')
    async unsubscribeToWatch(@Param() params: any) {
        try {
            return await this.quoteStockMasterService.unsubscribeToWatch(params.symbol);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Get('GEM')
    async findGEM(@Param() params: any) {
        try {
            return await this.quoteStockMasterService.findGEM();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Get('ETF')
    async findETF() {
        try {
            return await this.quoteStockMasterService.findETF();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Get('SB')
    async findSB() {
        try {
            return await this.quoteStockMasterService.findSB();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Get('IGNORE')
    async findIGNORE() {
        try {
            return await this.quoteStockMasterService.findIGNORE();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Get('SHC')
    async findSHC() {
        try {
            return await this.quoteStockMasterService.findSHC();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Get('SZC')
    async findSZC() {
        try {
            return await this.quoteStockMasterService.findSZC();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Get('AH')
    async findAH() {
        try {
            return await this.quoteStockMasterService.findAH();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Get('overview')
    async findOverviewStatic() {
        try {
            return {
                all: await this.quoteStockMasterService.findOverviewStatic(),
                byMarketCap: await this.quoteStockMasterService.findOverviewStaticByMarketCap(),
            };
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Get()
    async findAll() {
        try {
            return await this.quoteStockMasterService.findAll();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Put(':id')
    async update(@Param('id') id: any, @Body() body: any) {
        try {
            return await this.quoteStockMasterService.update(id, body);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    // @Get('overview_marketcap')
    // async findOverviewStaticByMarketCap() {
    //     try {
    //         return await this.quoteStockMasterService.findOverviewStaticByMarketCap();
    //     } catch (error) {
    //         throw new InternalServerErrorException(error);
    //     }
    // }
}
