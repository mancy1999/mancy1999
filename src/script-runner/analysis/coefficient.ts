import { yahoo_quote_history } from '../../core/infrastructure/importer/yahoo/history/history';

// here plan to calculate the coefficient. HSI and stock.
async function coefficient_compute() {
    let hsi_data = await yahoo_quote_history('^HSI');
    console.log(hsi_data);
    let data = await yahoo_quote_history('1238.HK');
    console.log(data);
    // let open: any[] = data.map((x: ICandlesTick) => x.Open);
    // let high: any[] = data.map((x: ICandlesTick) => x.High);
    // let low: any[] = data.map((x: ICandlesTick) => x.Low);
    // let close: any[] = data.map((x: ICandlesTick) => x.Close);
    // let volume: any[] = data.map((x: ICandlesTick) => x.Volume);
}

coefficient_compute();
