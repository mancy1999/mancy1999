
import { isNumber } from 'util';
import { Connection, ConnectionManager, getConnectionOptions, createConnection } from 'typeorm';
import { StockMasterRepo } from '../../dal/stock/StockMasterRepo';
import { AnalysisIndicatorsDetailRepo } from '../../dal/stock/AnalysisIndicatorsDetailRepo';
import { AnalysisCandleStickPatternDetailRepo } from '../../dal/stock/AnalysisCandleStickPatternDetailRepo';
import { AnalysisPatternRepo } from '../../dal/stock/AnalysisPatternDetailRepo';
import { AnalysisRegressionRepo } from '../../dal/stock/AnalysisRegressionRepo';
import { yahoo_quote_history } from '../../core/infrastructure/importer/yahoo/history/history';
import { ICandlesTick } from '../../core/infrastructure/model/stock.model';
import { PatternDetection } from '../../bl/analysis/pattern/pattern';
import { RegressionCompute } from '../../bl/analysis/regression/regresson';
import { Indicator } from '../../bl/analysis/Indicators/Indicators';
import { CandleStickPattern } from '../../bl/analysis/candleStickPattern/candleStickPattern';
export async function RunAnalysisAsync() {
    let connection: Connection;
    try {
        console.log('connecting to db...');
        const connection: Connection = await createConnection();
        let stockMasterRepo = new StockMasterRepo(connection);
        let symbols = await stockMasterRepo.findAll();
        console.log('getting stock master...');
        // await connection.close();

        let symbols_length = symbols.length;
        let multi_thread = 2;
        let temp_index = symbols_length / multi_thread;

        console.log('start connecting..');
        // await connection.connect();
        for (let i = 0; i < temp_index; i++) {
            try {
                console.log(`start analysising ${symbols[i].Symbol_Yahoo}`);
                await AnalysisAsyn(symbols[i].Symbol_Yahoo, connection);
                console.log(`done Analysis on ${symbols[i].Symbol_Yahoo}`);

            } catch (error) {
                console.log('catch error & continue');
                console.log(error);
                continue;
            }
        }
        // await connection.close();
        // console.log('closing connection...');
    } catch (error) {
        console.log('catch error');
        console.log(error);
    } finally {
        try {
            if (connection.isConnected) {
                console.log('finally for connection close');
                await connection.close();
            }
        } catch (error) {

        }
    }
}

async function AnalysisAsyn(symbol: string, connection: Connection) {
    try {
        let data: any[] = await yahoo_quote_history(symbol);
        if (data.length <= 0) {
            console.log(`${symbol}: 沒有資料`);
            return;
        }
        if (data.length <= 90) {
            console.log(`${symbol}: history資料少過90日`);
            return;
        }
        let open: any[] = data.map((x: ICandlesTick) => x.Open);
        let high: any[] = data.map((x: ICandlesTick) => x.High);
        let low: any[] = data.map((x: ICandlesTick) => x.Low);
        let close: any[] = data.map((x: ICandlesTick) => x.Close);
        let volume: any[] = data.map((x: ICandlesTick) => x.Volume);
        let _open = open.slice().reverse();
        let _high = high.slice().reverse();
        let _low = low.slice().reverse();
        let _close = close.slice().reverse();
        let _volume = volume.slice().reverse();

        console.log('computing analysis indicators detail...');
        let indicators = new Indicator().Compute(_open, _high, _low, _close, _volume);
        console.log('computing candlesstick pattern detail...');
        let candlesStickPattern = new CandleStickPattern().Compute(_open, _high, _low, _close);
        console.log('computing pattern detail...');
        let pattern = await PatternDetection(_close);
        console.log('computing regression detail...');
        let regression_result = await RegressionCompute(close);
        console.log('saving analysis indicators detail...');
        await createAnalysisIndicatorsDetail(connection, symbol, indicators.last);
        console.log('saving candlesstick pattern detail...');
        await createCandleStickPatternDetail(connection, symbol, candlesStickPattern);
        console.log('saving pattern detail...');
        await createPatternDetail(connection, symbol, pattern);
        console.log('saving regression detail...');
        await createRegression(connection, symbol, regression_result);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function createAnalysisIndicatorsDetail(conn: Connection, symbol: string, indicator: any) {
    try {
        let analysis_indicator_repo = new AnalysisIndicatorsDetailRepo(conn);
        await analysis_indicator_repo.create({
            ID: 0,
            Symbol: symbol,
            ADL: ValidNumber(indicator.ADL),
            ADX_adx: ValidNumber(indicator.ADX.adx),
            ADX_pdi: ValidNumber(indicator.ADX.pdi),
            ADX_mdi: ValidNumber(indicator.ADX.mdi),
            ATR: ValidNumber(indicator.ATR),
            AO: ValidNumber(indicator.AO),
            BB_upper: ValidNumber(indicator.BB.upper),
            BB_middle: ValidNumber(indicator.BB.middle),
            BB_lower: ValidNumber(indicator.BB.lower),
            BB_pb: ValidNumber(indicator.BB.pb),
            CCI: ValidNumber(indicator.CCI),
            FI: ValidNumber(indicator.FI),
            KST: ValidNumber(indicator.KST.kst),
            KST_signal: ValidNumber(indicator.KST.signal),
            MFI: ValidNumber(indicator.MFI),
            MACD: ValidNumber(indicator.MACD.MACD),
            MACD_signal: ValidNumber(indicator.MACD.signal),
            MACD_histogram: ValidNumber(indicator.MACD.histogram),
            OBV: ValidNumber(indicator.OBV),
            PSAR: ValidNumber(indicator.PSAR),
            ROC: ValidNumber(indicator.ROC),
            RSI: ValidNumber(indicator.RSI),
            SMA_14: ValidNumber(indicator.SMA_14),
            SMA_5: ValidNumber(indicator.SMA_5),
            SMA_10: ValidNumber(indicator.SMA_10),
            SMA_20: ValidNumber(indicator.SMA_20),
            SMA_50: ValidNumber(indicator.SMA_50),
            SMA_100: ValidNumber(indicator.SMA_100),
            SMA_250: ValidNumber(indicator.SMA_250),
            EMA_14: ValidNumber(indicator.EMA_14),
            EMA_5: ValidNumber(indicator.EMA_5),
            EMA_10: ValidNumber(indicator.EMA_10),
            EMA_20: ValidNumber(indicator.EMA_20),
            EMA_50: ValidNumber(indicator.EMA_50),
            EMA_100: ValidNumber(indicator.EMA_100),
            EMA_250: ValidNumber(indicator.EMA_250),
            WMA: ValidNumber(indicator.WMA),
            WEMA: ValidNumber(indicator.WEMA),
            Stochastic_k: ValidNumber(indicator.Stochastic.k),
            Stochastic_d: ValidNumber(indicator.Stochastic.d),
            TRIX: ValidNumber(indicator.TRIX),
            VWAP: ValidNumber(indicator.VWAP),
            VP_rangeStart: ValidNumber(indicator.VP.rangeStart),
            VP_rangeEnd: ValidNumber(indicator.VP.rangeEnd),
            VP_bullishVolume: ValidNumber(indicator.VP.bullishVolume),
            VP_bearishVolume: ValidNumber(indicator.VP.bearishVolume),
            VP_totalVolume: ValidNumber(indicator.VP.totalVolume),
            WR: ValidNumber(indicator.WR),
            CreateDate: new Date(),
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function createCandleStickPatternDetail(conn: Connection, symbol: string, CandleStickPattern: any) {
    try {
        let analysis_indicator_repo = new AnalysisCandleStickPatternDetailRepo(conn);
        await analysis_indicator_repo.create({
            ID: null,
            Symbol: symbol,
            AbandonedBaby: CandleStickPattern.AbandonedBaby,
            Bearishengulfingpattern: CandleStickPattern.Bearishengulfingpattern,
            Bullishengulfingpattern: CandleStickPattern.Bullishengulfingpattern,
            Darkcloudcover: CandleStickPattern.Darkcloudcover,
            Downsidetasukigap: CandleStickPattern.Downsidetasukigap,
            Doji: CandleStickPattern.Doji,
            Dragonflydoji: CandleStickPattern.Dragonflydoji,
            Gravestonedoji: CandleStickPattern.Gravestonedoji,
            Bullishharami: CandleStickPattern.Bullishharami,
            Bearishharamicross: CandleStickPattern.Bearishharamicross,
            Bullishharamicross: CandleStickPattern.Bullishharamicross,
            Bullishmarubozu: CandleStickPattern.Bullishmarubozu,
            Bearishmarubozu: CandleStickPattern.Bearishmarubozu,
            Eveningdojistar: CandleStickPattern.Eveningdojistar,
            Eveningstar: CandleStickPattern.Eveningstar,
            Bearishharami: CandleStickPattern.Bearishharami,
            Piercingline: CandleStickPattern.Piercingline,
            Bullishspinningtop: CandleStickPattern.Bullishspinningtop,
            Bearishspinningtop: CandleStickPattern.Bearishspinningtop,
            Morningdojistar: CandleStickPattern.Morningdojistar,
            Morningstar: CandleStickPattern.Morningstar,
            Threeblackcrows: CandleStickPattern.Threeblackcrows,
            Threewhitesoldiers: CandleStickPattern.Threewhitesoldiers,
            CreateDate: new Date(),
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function createPatternDetail(conn: Connection, symbol: string, Pattern: any) {
    try {
        let analysis_pattern_repo = new AnalysisPatternRepo(conn);
        await analysis_pattern_repo.create({
            ID: null,
            Symbol: symbol,
            hasDoubleBottom: Pattern.hasDoubleBottom,
            hasDoubleTop: Pattern.hasDoubleTop,
            hasHeadAndShoulder: Pattern.hasHeadAndShoulder,
            hasInverseHeadAndShoulder: Pattern.hasInverseHeadAndShoulder,
            isTrendingUp: Pattern.isTrendingUp,
            isTrendingDown: Pattern.isTrendingDown,
            CreateDate: new Date(),
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function createRegression(conn: Connection, symbol: string, regression: any) {
    try {
        let analysis_regression_repo = new AnalysisRegressionRepo(conn);
        await analysis_regression_repo.create({
            ID: null,
            Symbol: symbol,
            gradient: regression.gradient,
            yIntercept: regression.yIntercept,
            CreateDate: new Date(),
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

function ValidNumber(input: number) {
    if (isNumber(input)) {
        if (input == Number.POSITIVE_INFINITY || input == Number.NEGATIVE_INFINITY) {
            return null;
        }

        if (Number.isNaN(input)) {
            return null;
        }
        return input;
    } else {
        return null;
    }
}

RunAnalysisAsync();
