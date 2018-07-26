import { Controller, HttpCode, Get, Param, Body, Post, NotFoundException, UseFilters, Delete, BadRequestException } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'common/exception/exception.filter';
import { AnalysisCandleStickPatternDetailService } from '../service/AnalysisCandleStickPatternDetail.service';
import { AnalysisRegressionService } from '../service/AnalysisRegression.service';
import { AnalysisPatternDetailService } from '../service/AnalysisPattern.service';
import { AnalysisIndicatorsDetailService } from '../service/AnalysisIndicatorsDetail.service';
import { pad } from '../../core/infrastructure/utils/utils';

@ApiUseTags('analysis')
@Controller('analysis')
@UseFilters(new HttpExceptionFilter())
export class AnalysisController {
    constructor(
        private analyAnalysisCandleStickPatternDetailServicesisService: AnalysisCandleStickPatternDetailService,
        private analysisIndicatorsDetailService: AnalysisIndicatorsDetailService,
        private analysisPatternDetailService: AnalysisPatternDetailService,
        private analysisRegressionService: AnalysisRegressionService,
    ) {
    }

    @HttpCode(200)
    @Get('indicators')
    async findAll_indicators() {
        try {
            return await this.analysisIndicatorsDetailService.findByLatestRecords();
        } catch (error) {
            return new BadRequestException(error);
        }
    }

    @HttpCode(200)
    @Get('indicators/:Symbol')
    async findAll_indicators_BySymbol(@Param() params: any) {
        try {
            let symbol = `${pad(params.Symbol, 4)}.HK`;
            console.log(symbol);
            return await this.analysisIndicatorsDetailService.findByLatestRecordsBySymbol(symbol);
        } catch (error) {
            return new BadRequestException(error);
        }
    }

    @HttpCode(200)
    @Get('candlesStick')
    async findAll_candlesStick() {
        try {
            return await this.analyAnalysisCandleStickPatternDetailServicesisService.findByLatestRecords();
        } catch (error) {
            return new BadRequestException(error);
        }
    }

    @HttpCode(200)
    @Get('candlesStick/:Symbol')
    async findAll_candlesStick_BySymbol(@Param() params: any) {
        try {
            let symbol = `${pad(params.Symbol, 4)}.HK`;
            return await this.analyAnalysisCandleStickPatternDetailServicesisService.findByLatestRecordsBySymbol(symbol);
        } catch (error) {
            return new BadRequestException(error);
        }
    }

    @HttpCode(200)
    @Get('candlesStickMaster')
    async findAll_candlesStick_Master(@Param() params: any) {
        try {
            return await this.analyAnalysisCandleStickPatternDetailServicesisService.findCandlesStickMaster();
        } catch (error) {
            return new BadRequestException(error);
        }
    }

    @HttpCode(200)
    @Get('candlesStick/:CandlesName')
    async findAll_candlesStick_ByCandlesName(@Param() params: any) {
        try {
            return await this.analyAnalysisCandleStickPatternDetailServicesisService.findByLatestRecordsBySymbol(params.CandlesName);
        } catch (error) {
            return new BadRequestException(error);
        }
    }

    @HttpCode(200)
    @Get('pattern')
    async findAll_pattern() {
        try {
            return await this.analysisPatternDetailService.findByLatestRecords();
        } catch (error) {
            return new BadRequestException(error);
        }
    }

    @HttpCode(200)
    @Get('pattern/:Symbol')
    async findAll_pattern_BySymbol(@Param() params: any) {
        try {
            let symbol = `${pad(params.Symbol, 4)}.HK`;
            return await this.analysisPatternDetailService.findByLatestRecordsBySymbol(symbol);
        } catch (error) {
            return new BadRequestException(error);
        }
    }

    @HttpCode(200)
    @Get('regression')
    async findAll_regression() {
        try {
            return await this.analysisRegressionService.findByLatestRecords();
        } catch (error) {
            return new BadRequestException(error);
        }
    }

    @HttpCode(200)
    @Get('regression/:Symbol')
    async findAll_regression_BySymbol(@Param() params: any) {
        try {
            let symbol = `${pad(params.Symbol, 4)}.HK`;
            return await this.analysisRegressionService.findByLatestRecordsBySymbol(symbol);
        } catch (error) {
            return new BadRequestException(error);
        }
    }
}


