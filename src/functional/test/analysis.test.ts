import { yahoo_quote_history } from '../../core/infrastructure/importer/yahoo/history/history';
import { RegressionCompute } from '../../bl/analysis/regression/regresson';
import { ICandlesTick } from '../../core/infrastructure/model/stock.model';
import { Indicator } from '../../bl/analysis/Indicators/Indicators';
import { CandleStickPattern } from '../../bl/analysis/candleStickPattern/candleStickPattern';
import { PatternDetection } from '../../bl/analysis/pattern/pattern';

async function test_regression() {
    let data = await yahoo_quote_history('1238.HK');
    let close: any[] = data.map((x: ICandlesTick) => x.Close);
    let regression_result = await RegressionCompute(close);
    console.log(regression_result);
}

async function test_indicators() {
    let data = await yahoo_quote_history('1238.HK');
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
    let indicators = new Indicator().Compute(_open, _high, _low, _close, _volume);
    console.log(indicators.last);
}

async function test_candlesStickPattern() {
    let data = await yahoo_quote_history('1238.HK');
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
    let candlesStickPattern = new CandleStickPattern().Compute(_open, _high, _low, _close);
    console.log(candlesStickPattern);
}

async function test_pattern() {
    let data = await yahoo_quote_history('1238.HK');
    let close: any[] = data.map((x: ICandlesTick) => x.Close);
    let _close = close.slice().reverse();
    let pattern = await PatternDetection(_close);
    console.log(pattern);
}