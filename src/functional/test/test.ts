// import { AastockImporter } from "../importer/aastock/aastock.importer";
// import { yahoo_quote_history } from "../importer/yahoo/history/history";
// import { IOHLC, ICandlesTick } from "../model/stock.model";
// import { Indicator } from "../analysis/Indicators/Indicators";
// import { CandleStickPattern } from "../analysis/candleStickPattern/candleStickPattern";
// import { PatternDetection, RegressionCompute } from "../analysis/pattern/pattern";
// // import { yahoo_quote } from "../importer/yahoo/quote/quote";
// // import { quoteType } from "../importer/yahoo/quote/enum/quoteType";
// // import { AastockImporter } from "../importer/aastock/aastock.importer";
// import { createConnection, Connection } from "typeorm";

// import "reflect-metadata";
// import { quoteType } from "../importer/yahoo/quote/enum/quoteType";
// import { yahoo_quote } from "../importer/yahoo/quote/quote";

// // async function test_yahoo_quote_history() {
// //     let data = await yahoo_quote_history("1238.HK");
// //     let open: any[] = data.map((x: ICandlesTick) => x.Open);
// //     let high: any[] = data.map((x: ICandlesTick) => x.High);
// //     let low: any[] = data.map((x: ICandlesTick) => x.Low);
// //     let close: any[] = data.map((x: ICandlesTick) => x.Close);
// //     let volume: any[] = data.map((x: ICandlesTick) => x.Volume);

// //     let _open = open.slice().reverse();
// //     let _high = high.slice().reverse();
// //     let _low = low.slice().reverse();
// //     let _close = close.slice().reverse();
// //     let _volume = volume.slice().reverse();

// //     let indicators = new Indicator().Compute(_open, _high, _low, _close, _volume);
// //     console.log(indicators.last);
// //     let candlesStickPattern = new CandleStickPattern().Compute(_open, _high, _low, _close);
// //     console.log(candlesStickPattern);
// //     let pattern = await PatternDetection(_close);
// //     console.log(pattern);

// //     // no need order, 最新的在 頭
// //     let regression_result = await RegressionCompute(close);
// //     console.log(regression_result);
// // }

// async function test_yahoo_quote_with_modules() {
//     let data = await yahoo_quote("1800.HK", [quoteType.summaryDetail, quoteType.price, quoteType.financialData, quoteType.earnings, quoteType.defaultKeyStatistics]);
//     let defaultKeyStatistics = data[quoteType.defaultKeyStatistics];
//     console.log(defaultKeyStatistics);
//     let earnings = data[quoteType.earnings];
//     console.log(earnings);
//     let financialData = data[quoteType.financialData];
//     console.log(financialData);
//     let price = data[quoteType.price];
//     console.log(price);
//     let summaryDetail = data[quoteType.summaryDetail];
//     console.log(summaryDetail);
// }

// // async function test_aastock_quote() {
// //     var data = await new AastockImporter().quote("1800");
// //     console.log(data);
// // }

// // async function start() {

// //     // const connection = await createConnection({
// //     //     type: "mssql",
// //     //     host: "EDPSHEL10\\SQLEXPRESS",
// //     //     port: 1433,
// //     //     username: "sa",
// //     //     password: "master",
// //     //     database: "StockDb",
// //     //     entities: [
// //     //         "src/entities/**/*.ts"
// //     //     ],
// //     // });
// //     let connection = await createConnection();
// //     console.log(connection);

// //     test_yahoo_quote_history();
// // }

// test_yahoo_quote_with_modules();

// // test_aastock_quote();

// // test_yahoo_quote_with_modules();
