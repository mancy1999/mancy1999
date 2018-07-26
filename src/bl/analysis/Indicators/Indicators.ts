
export abstract class BaseIndicator {
    abstract Compute(open: number[], high: number[], low: number[], close: number[], volume: number[]): any;
}

const ADL = require('technicalindicators').ADL;
const ADX = require('technicalindicators').ADX;
const ATR = require('technicalindicators').ATR;
const AO = require('technicalindicators').AwesomeOscillator;
const BB = require('technicalindicators').BollingerBands;
const CCI = require('technicalindicators').CCI;
const FI = require('technicalindicators').ForceIndex;
const KST = require('technicalindicators').KST;
const MFI = require('technicalindicators').MFI;
const MACD = require('technicalindicators').MACD;
const OBV = require('technicalindicators').OBV;
const PSAR = require('technicalindicators').PSAR;
const ROC = require('technicalindicators').ROC;
const RSI = require('technicalindicators').RSI;
const SMA = require('technicalindicators').SMA;
const Stochastic = require('technicalindicators').Stochastic;
const TRIX = require('technicalindicators').TRIX;
const TP = require('technicalindicators').TypicalPrice;
const VWAP = require('technicalindicators').VWAP;
const VP = require('technicalindicators').VolumeProfile;
const EMA = require('technicalindicators').EMA;
const WMA = require('technicalindicators').WMA;
const WEMA = require('technicalindicators').WEMA;
const WR = require('technicalindicators').WilliamsR;

// ADL
export class Indicator extends BaseIndicator {
    private readonly ADX_PERIOD = 14;
    private readonly ATR_PERIOD = 14;
    private readonly BB_PERIOD = 14;
    private readonly CCI_PERIOD = 14;
    private readonly FI_PERIOD = 1;
    private readonly MFI_PERIOD = 14;

    private readonly MACD_FAST_PERIOD = 12;
    private readonly MACD_SLOW_PERIOD = 26;
    private readonly MACD_SIGNAL_PERIOD = 9;
    private readonly ROC_PERIOD = 12;
    private readonly RSI_PERIOD = 14;
    private readonly SMA_PERIOD = 14;
    private readonly EMA_PERIOD = 14;
    private readonly WMA_PERIOD = 14;
    private readonly WEMA_PERIOD = 14;
    private readonly WR_PERIOD = 14;

    private readonly Stochastic_PERIOD = 3;
    private readonly TRIX_PERIOD = 18;
    private readonly FAST_PERIOD = 12;
    private readonly SLOW_PERIOD = 26;

    options = {
        ADX_PERIOD: 14,
        ATR_PERIOD: 14,
        BB_PERIOD: 14,
        CCI_PERIOD: 14,
        FI_PERIOD: 1,
        MFI_PERIOD: 14,
        MACD_FAST_PERIOD: 12,
        MACD_SLOW_PERIOD: 26,
        MACD_SIGNAL_PERIOD: 9,
        ROC_PERIOD: 12,
        RSI_PERIOD: 14,
        SMA_PERIOD: 14,
        EMA_PERIOD: 14,
        WMA_PERIOD: 14,
        WEMA_PERIOD: 14,
        WR_PERIOD: 14,
        Stochastic_PERIOD: 3,
        TRIX_PERIOD: 18,
        FAST_PERIOD: 12,
        SLOW_PERIOD: 26,
    }

    constructor() {
        super();
    }

    Compute(open: number[] = [], high: number[] = [], low: number[] = [], close: number[] = [], volume: number[] = []) {
        try {
            let latest: any = {};
            let data: any = {};

            let ADLResult = ADL.calculate({
                high: high,
                low: low,
                close: close,
                volume: volume,
            });

            latest['ADL'] = ADLResult.pop();
            data['ADL'] = ADLResult;

            let ADXResult = ADX.calculate({
                high: high,
                low: low,
                close: close,
                period: this.ADX_PERIOD,
            });

            latest['ADX'] = ADXResult.pop();
            data['ADX'] = ADXResult;

            let ATRResult = ATR.calculate({
                high: high,
                low: low,
                close: close,
                period: this.ATR_PERIOD,
            });

            latest['ATR'] = ATRResult.pop();
            data['ATR'] = ATRResult;

            let AOResult = AO.calculate({
                high: high,
                low: low,
                fastPeriod: this.FAST_PERIOD,
                slowPeriod: this.SLOW_PERIOD,
            })

            latest['AO'] = AOResult.pop();
            data['AO'] = AOResult;

            let BBResult = BB.calculate({
                values: close,
                period: this.BB_PERIOD,
                stdDev: 2
            })

            latest['BB'] = BBResult.pop();
            data['BB'] = BBResult;

            let CCIResult = CCI.calculate({
                open: open,
                high: high,
                low: low,
                close: close,
                period: this.CCI_PERIOD,
            })

            latest['CCI'] = CCIResult.pop();
            data['CCI'] = CCIResult;

            let FIResult = FI.calculate({
                open: open,
                high: high,
                low: low,
                close: close,
                volume: volume,
                period: this.FI_PERIOD,
            })

            latest['FI'] = FIResult.pop();
            data['FI'] = FIResult;

            let KSTResult = KST.calculate({
                values: close,
                ROCPer1: 10,
                ROCPer2: 15,
                ROCPer3: 20,
                ROCPer4: 30,
                SMAROCPer1: 10,
                SMAROCPer2: 10,
                SMAROCPer3: 10,
                SMAROCPer4: 15,
                signalPeriod: 3
            })

            latest['KST'] = KSTResult.pop();
            data['KST'] = KSTResult;

            let MFIResult = MFI.calculate({
                high: high,
                low: low,
                close: close,
                volume: volume,
                period: this.MFI_PERIOD,
            })

            latest['MFI'] = MFIResult.pop();
            data['MFI'] = MFIResult;

            let MACDResult = MACD.calculate({
                values: close,
                fastPeriod: this.MACD_FAST_PERIOD,
                slowPeriod: this.MACD_SLOW_PERIOD,
                signalPeriod: this.MACD_SIGNAL_PERIOD,
                SimpleMAOscillator: false,
                SimpleMASignal: false
            })

            latest['MACD'] = MACDResult.pop();
            data['MACD'] = MACDResult;

            let OBVResult = OBV.calculate({
                close: close,
                volume: volume,
            });

            latest['OBV'] = OBVResult.pop();
            data['OBV'] = OBVResult;

            let PSARResult = PSAR.calculate({
                high: high,
                low: low,
                step: 0.02,
                max: 0.2,
            });

            latest['PSAR'] = PSARResult.pop();
            data['PSAR'] = PSARResult;

            let ROCResult = ROC.calculate({
                values: close,
                period: this.ROC_PERIOD,
            });

            latest['ROC'] = ROCResult.pop();
            data['ROC'] = ROCResult;

            let RSIResult = RSI.calculate({
                values: close,
                period: this.RSI_PERIOD,
            });

            latest['RSI'] = RSIResult.pop();
            data['RSI'] = RSIResult;


            let SMAResult_14 = SMA.calculate({
                values: close,
                period: this.SMA_PERIOD,
            });

            let SMAResult_5 = SMA.calculate({
                values: close,
                period: 5,
            });
            let SMAResult_10 = SMA.calculate({
                values: close,
                period: 10,
            });
            let SMAResult_20 = SMA.calculate({
                values: close,
                period: 20,
            });
            let SMAResult_50 = SMA.calculate({
                values: close,
                period: 50,
            });
            let SMAResult_100 = SMA.calculate({
                values: close,
                period: 100,
            });
            let SMAResult_250 = SMA.calculate({
                values: close,
                period: 250,
            });

            latest['SMA_14'] = SMAResult_14.pop();
            latest['SMA_5'] = SMAResult_5.pop();
            latest['SMA_10'] = SMAResult_10.pop();
            latest['SMA_20'] = SMAResult_20.pop();
            latest['SMA_50'] = SMAResult_50.pop();
            latest['SMA_100'] = SMAResult_100.pop();
            latest['SMA_250'] = SMAResult_250.pop();
            data['SMA_14'] = SMAResult_14;
            data['SMA_5'] = SMAResult_5;
            data['SMA_10'] = SMAResult_10;
            data['SMA_20'] = SMAResult_20;
            data['SMA_50'] = SMAResult_50;
            data['SMA_100'] = SMAResult_100;
            data['SMA_250'] = SMAResult_250;

            let EMAResult_14 = EMA.calculate({
                values: close,
                period: this.EMA_PERIOD,
            });

            let EMAResult_5 = EMA.calculate({
                values: close,
                period: 5,
            });
            let EMAResult_10 = EMA.calculate({
                values: close,
                period: 10,
            });
            let EMAResult_20 = EMA.calculate({
                values: close,
                period: 20,
            });
            let EMAResult_50 = EMA.calculate({
                values: close,
                period: 50,
            });

            let EMAResult_100 = EMA.calculate({
                values: close,
                period: 100,
            });
            let EMAResult_250 = EMA.calculate({
                values: close,
                period: 250,
            });


            latest['EMA_14'] = EMAResult_14.pop();
            latest['EMA_5'] = EMAResult_5.pop();
            latest['EMA_10'] = EMAResult_10.pop();
            latest['EMA_20'] = EMAResult_20.pop();
            latest['EMA_50'] = EMAResult_50.pop();
            latest['EMA_100'] = EMAResult_100.pop();
            latest['EMA_250'] = EMAResult_250.pop();
            data['EMA_14'] = EMAResult_14;
            data['EMA_5'] = EMAResult_5;
            data['EMA_10'] = EMAResult_10;
            data['EMA_20'] = EMAResult_20;
            data['EMA_50'] = EMAResult_50;
            data['EMA_100'] = EMAResult_100;
            data['EMA_250'] = EMAResult_250;

            let WMAResult = WMA.calculate({
                values: close,
                period: this.WMA_PERIOD,
            });

            latest['WMA'] = WMAResult.pop();
            data['WMA'] = WMAResult;

            let WEMAResult = WEMA.calculate({
                values: close,
                period: this.WEMA_PERIOD,
            });

            latest['WEMA'] = WEMAResult.pop();
            data['WEMA'] = WEMAResult;

            let StochasticResult = Stochastic.calculate({
                high: high,
                low: low,
                close: close,
                period: 14,
                signalPeriod: 3
            });

            latest['Stochastic'] = StochasticResult.pop();
            data['Stochastic'] = StochasticResult;

            let TRIXResult = TRIX.calculate({
                values: close,
                period: this.TRIX_PERIOD,
            });

            latest['TRIX'] = TRIXResult.pop();
            data['TRIX'] = TRIXResult;

            // let TPResult = TP.calculate({
            //     high: high,
            //     low: low,
            //     close: close,
            // })

            // result.push({
            //     TP: TPResult
            // });

            let VWAPResult = VWAP.calculate({
                open: open,
                high: high,
                low: low,
                close: close,
                volume: volume,
            });

            latest['VWAP'] = VWAPResult.pop();
            data['VWAP'] = VWAPResult;

            let VPResult = VP.calculate({
                open: open,
                high: high,
                low: low,
                close: close,
                volume: volume,
                noOfBars: 14,
            });

            latest['VP'] = VPResult.pop();
            data['VP'] = VPResult;

            let WRResult = WR.calculate({
                high: high,
                low: low,
                close: close,
                period: this.WR_PERIOD,
            });

            latest['WR'] = WRResult.pop();
            data['WR'] = WRResult;

            return {
                last: latest,
                data: data,
            };

        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
