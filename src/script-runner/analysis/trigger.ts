
import { createConnection, Connection } from 'typeorm';
import { Analysis_CandleStickPattern_Detail } from '../../entities/Analysis_CandleStickPattern_Detail';
import { AnalysisCandleStickPatternDetailRepo } from '../../dal/stock/AnalysisCandleStickPatternDetailRepo';

export async function RunAsync() {
    // will get the orm config.
    let connection = await createConnection();
    try {
        let analysisCandleStickPatternDetailRepo = new AnalysisCandleStickPatternDetailRepo(connection);
        let analysisCandleStickPatternDetail = await analysisCandleStickPatternDetailRepo.findAll();
        for (let candles of analysisCandleStickPatternDetail) {
            try {
                await checkCandleStickPatternDetail(candles, connection);
            } catch (error) {
                console.log(error);
                continue;
            }
        }
    } catch (error) {
        console.log(error);
    }
    finally {
        if (connection.isConnected) {
            connection.close();
        }
        console.log('success');
    }
}

async function checkCandleStickPatternDetail(candles: Analysis_CandleStickPattern_Detail, conn: Connection) {
    // let quote = await new AastockImporter().quote(stock.Symbol);
    // if (quote) {
    //     if (quote.QuoteType == 'S') {
    //         let stockMasterRepo = new StockMasterRepo(conn);
    //         let result = await stockMasterRepo.findOneBySymbol(stock.Symbol);
    //         if (result) {
    //             result.Name_CN = quote.Desp;
    //             console.log(result);
    //             try {
    //                 await stockMasterRepo.update(result.ID, result);
    //             } catch (error) {
    //                 console.log(error);
    //                 throw (error);
    //             }
    //         }
    //     }
    // }
}



async function checkBB() {

}

RunAsync();
