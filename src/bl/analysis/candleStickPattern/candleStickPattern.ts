import { ConvertToDaysList } from '../../../core/infrastructure/utils/utils';
let AbandonedBaby = require('technicalindicators').abandonedbaby;
let bearishengulfingpattern = require('technicalindicators').bearishengulfingpattern;
let bullishengulfingpattern = require('technicalindicators').bullishengulfingpattern;
let darkcloudcover = require('technicalindicators').darkcloudcover;
let downsidetasukigap = require('technicalindicators').downsidetasukigap;
let doji = require('technicalindicators').doji;
let dragonflydoji = require('technicalindicators').dragonflydoji;
let gravestonedoji = require('technicalindicators').gravestonedoji;
let bullishharami = require('technicalindicators').bullishharami;
let bearishharamicross = require('technicalindicators').bearishharamicross;
let bullishharamicross = require('technicalindicators').bullishharamicross;
let bearishmarubozu = require('technicalindicators').bearishmarubozu;
let bullishmarubozu = require('technicalindicators').bullishmarubozu;
let eveningdojistar = require('technicalindicators').eveningdojistar;
let eveningstar = require('technicalindicators').eveningstar;
let bearishharami = require('technicalindicators').bearishharami;
let piercingline = require('technicalindicators').piercingline;
let bullishspinningtop = require('technicalindicators').bullishspinningtop;
let bearishspinningtop = require('technicalindicators').bearishspinningtop;
let morningstar = require('technicalindicators').morningstar;
let morningdojistar = require('technicalindicators').morningdojistar;
let threeblackcrows = require('technicalindicators').threeblackcrows;
let threewhitesoldiers = require('technicalindicators').threewhitesoldiers;

abstract class BaseCandleStickPattern {
    abstract Compute(open: number[], high: number[], low: number[], close: number[]): any;
}

export class CandleStickPattern extends BaseCandleStickPattern {
    constructor() {
        super();
    }

    Compute(open: number[], high: number[], low: number[], close: number[]) {
        // take the last 3 2 1 records
        let open_3 = ConvertToDaysList(open, 3);
        let open_2 = ConvertToDaysList(open, 2);
        let open_1 = ConvertToDaysList(open, 1);
        let high_3 = ConvertToDaysList(high, 3);
        let high_2 = ConvertToDaysList(high, 2);
        let high_1 = ConvertToDaysList(high, 1);

        let low_3 = ConvertToDaysList(low, 3);
        let low_2 = ConvertToDaysList(low, 2);
        let low_1 = ConvertToDaysList(low, 1);

        let close_3 = ConvertToDaysList(close, 3);
        let close_2 = ConvertToDaysList(close, 2);
        let close_1 = ConvertToDaysList(close, 1);

        // let result = [];
        let result: any = {};
        let threeDayInput = {
            open: open_3,
            high: high_3,
            close: close_3,
            low: low_3
        };

        let twoDayInput = {
            open: open_2,
            high: high_2,
            close: close_2,
            low: low_2
        };
        let oneDayInput = {
            open: open_1,
            high: high_1,
            close: close_1,
            low: low_1
        };

        let AbandonedBabyResult = AbandonedBaby(threeDayInput);
        result['AbandonedBaby'] = AbandonedBabyResult;

        let BearishengulfingpatternResult = bearishengulfingpattern(twoDayInput);
        result['Bearishengulfingpattern'] = BearishengulfingpatternResult;

        let BullishengulfingpatternResult = bullishengulfingpattern(twoDayInput);
        result['Bullishengulfingpattern'] = BullishengulfingpatternResult;

        let DarkcloudcoverResult = darkcloudcover(twoDayInput);
        result['Darkcloudcover'] = DarkcloudcoverResult;

        let DownsidetasukigapResult = downsidetasukigap(threeDayInput);
        result['Downsidetasukigap'] = DownsidetasukigapResult;

        let DojiResult = doji(oneDayInput);
        result['Doji'] = DojiResult;

        let DragonflydojiResult = dragonflydoji(oneDayInput);
        result['Dragonflydoji'] = DragonflydojiResult;

        let GravestonedojiResult = gravestonedoji(oneDayInput);
        result['Gravestonedoji'] = GravestonedojiResult;

        let BullishharamiResult = bullishharami(twoDayInput);
        result['Bullishharami'] = BullishharamiResult;

        let BearishharamicrossResult = bearishharamicross(twoDayInput);
        result['Bearishharamicross'] = BearishharamicrossResult;

        let BullishharamicrossResult = bullishharamicross(twoDayInput);
        result['Bullishharamicross'] = BullishharamicrossResult;

        let BullishmarubozuResult = bullishmarubozu(oneDayInput);
        result['Bullishmarubozu'] = BullishmarubozuResult;

        let BearishmarubozuResult = bearishmarubozu(oneDayInput);
        result['Bearishmarubozu'] = BearishmarubozuResult;

        let EveningdojistarResult = eveningdojistar(threeDayInput);
        result['Eveningdojistar'] = EveningdojistarResult;

        let EveningstarResult = eveningstar(threeDayInput);
        result['Eveningstar'] = EveningstarResult;

        let BearishharamiResult = bearishharami(twoDayInput);
        result['Bearishharami'] = BearishharamiResult;

        let PiercinglineResult = piercingline(twoDayInput);
        result['Piercingline'] = PiercinglineResult;

        let BullishspinningtopResult = bullishspinningtop(oneDayInput);
        result['Bullishspinningtop'] = BullishspinningtopResult;

        let BearishspinningtopResult = bearishspinningtop(oneDayInput);
        result['Bearishspinningtop'] = BearishspinningtopResult;

        let MorningdojistarResult = morningdojistar(threeDayInput);
        result['Morningdojistar'] = MorningdojistarResult;

        let MorningstarResult = morningstar(threeDayInput);
        result['Morningstar'] = MorningstarResult;

        let ThreeblackcrowsResult = threeblackcrows(threeDayInput);
        result['Threeblackcrows'] = ThreeblackcrowsResult;

        let ThreewhitesoldiersResult = threewhitesoldiers(threeDayInput);
        result['Threewhitesoldiers'] = ThreewhitesoldiersResult;

        return result;
    }
}

