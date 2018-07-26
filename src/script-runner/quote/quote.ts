import { StockMaster } from './../../entities/StockMaster';
import { Connection } from 'typeorm/connection/Connection';
import { ConnectionManager } from 'typeorm/connection/ConnectionManager';
import { getConnectionOptions } from 'typeorm';
import { StockMasterRepo } from '../../dal/stock/StockMasterRepo';
import { Quote } from '../../entities/Quote';
import { AastockImporter } from '../../core/infrastructure/importer/aastock/aastock.importer';
import { formatDataWithUnit, formatNumber } from '../../core/infrastructure/utils/formatter';
import { pad } from '../../core/infrastructure/utils/utils';

// this script write to save the latest quote to database.
export async function QuoteAsync(SB_includes: boolean = true, GEM_includes: boolean = true, ETF_includes: boolean = false, Thread: number = 5) {
    let importer = new AastockImporter();
    let connection: Connection;
    let symbols: StockMaster[] = [];
    let quote_result = [];
    try {
        console.log('connecting to db...');
        const connectionManager = new ConnectionManager();
        const connectionOptions = await getConnectionOptions();
        connection = connectionManager.create(connectionOptions);
        await connection.connect();

        let stockMasterRepo = new StockMasterRepo(connection);
        // let symbols = await stockMasterRepo.findAll();
        if (SB_includes) {
            console.log('getting SB list...');
            let temp_quote_list = await stockMasterRepo.findSB();

            for (const quote of temp_quote_list) {
                try {
                    console.log(`working on aastock quote ${quote.Symbol_Aastock}`);
                    let temp_ = await importer.quote(quote.Symbol_Aastock);
                    console.log(`done on aastock quote ${quote.Symbol_Aastock} and push`);
                    quote_result.push(temp_);
                } catch (error) {
                    console.log(error);
                    continue;
                }
            }

        }
        if (GEM_includes) {
            console.log('getting GEM list...');
            let temp_quote_list = await stockMasterRepo.findGEM();
            for (const quote of temp_quote_list) {
                try {
                    console.log(`working on aastock quote ${quote.Symbol_Aastock}`);
                    let temp_ = await importer.quote(quote.Symbol_Aastock);
                    console.log(`done on aastock quote ${quote.Symbol_Aastock} and push`);
                    quote_result.push(temp_);
                } catch (error) {
                    console.log(error);
                    continue;
                }
            }
        }
        if (ETF_includes) {
            console.log('getting ETF list...');
            let temp_quote_list = await stockMasterRepo.findETF();
            for (const quote of temp_quote_list) {
                try {
                    console.log(`working on aastock quote ${quote.Symbol_Aastock}`);
                    let temp_ = await importer.quote(quote.Symbol_Aastock);
                    console.log(`done on aastock quote ${quote.Symbol_Aastock} and push`);
                    quote_result.push(temp_);
                } catch (error) {
                    console.log(error);
                    continue;
                }
            }
        }

        console.log(`there are ${quote_result.length} symbols..`);
        console.log('transforming data...');
        let t_data = quote_result.map((x: any) => {
            let temp = {
                Symbol: pad(x.Symbol, 4),
                Symbol_Aastock: x.Symbol,
                Desp: x.Desp,
                Last: formatNumber(x.Last),
                Open: formatNumber(x.Open),
                PrevClose: formatNumber(x.PrevClose),
                High: formatNumber(x.High),
                Low: formatNumber(x.Low),
                Change: formatNumber(x.Change),
                PctChange: formatNumber(x.PctChange),
                Volume: formatDataWithUnit(x.Volume),
                Turnover: formatDataWithUnit(x.Turnover),
                MarketCap: formatDataWithUnit(x.MarketCap),
                LastUpdate: new Date(x.LastUpdate),
            };
            return temp;
        });
        console.log('transform data');
        console.time('transform');
        for (const td of t_data) {
            try {
                await connection.connect();
                let quoteAastockRepo = connection.getRepository(Quote);
                await quoteAastockRepo.save(td);
                await connection.close();
            } catch (error) {
                if (connection.isConnected) {
                    await connection.close();
                }
                continue;
            }
        }
        console.timeEnd('transform');

    }
    catch (error) {
        console.error();
        if (connection.isConnected) {
            await connection.close();
        }
    }
    finally {
        if (connection.isConnected) {
            await connection.close();
        }
    }
}

async function quote_realtime() {
    let importer = new AastockImporter();
    let quote_list = [];
    let quote_result_1 = [];
    let quote_result_2 = [];
    let connection: Connection;
    try {
        console.log('connecting to db...');
        const connectionManager = new ConnectionManager();
        const connectionOptions = await getConnectionOptions();
        connection = connectionManager.create(connectionOptions);
        await connection.connect();
        let stockMasterRepo = new StockMasterRepo(connection);
        let symbols = await stockMasterRepo.findAll();
        // quote for aastock
        quote_list = symbols.map(x => x.Symbol_Aastock);
        console.log('getting stock master...');
        await connection.close();
        // var data = await new AastockImporter().quote('1800');
        console.log(`there are ${quote_list.length} symbols..`);
        // tricky thing.
        let r_index = 0;

        for (const quote of quote_list) {
            try {
                console.log(`working on aastock quote ${quote}`);
                let temp_ = await importer.quote(quote);
                console.log(`done on aastock quote ${quote} and push`);
                if (r_index % 2 == 0) {
                    quote_result_1.push(temp_);
                } else {
                    quote_result_2.push(temp_);
                }
            } catch (error) {
                console.log(error);
                continue;
            }
        }

        console.log('transforming data...');
        let t_data_1 = quote_result_1.map((x: any) => {
            let temp = {
                Symbol: x.Symbol,
                Desp: x.Desp,
                Last: formatNumber(x.Last),
                Open: formatNumber(x.Open),
                PrevClose: formatNumber(x.PrevClose),
                High: formatNumber(x.High),
                Low: formatNumber(x.Low),
                Change: formatNumber(x.Change),
                PctChange: formatNumber(x.PctChange),
                Volume: formatDataWithUnit(x.Volume),
                Turnover: formatDataWithUnit(x.Turnover),
                MarketCap: formatDataWithUnit(x.MarketCap),
                LastUpdate: new Date(x.LastUpdate),
            };
            return temp;
        });


        let t_data_2 = quote_result_2.map((x: any) => {
            let temp = {
                Symbol: x.Symbol,
                Desp: x.Desp,
                Last: formatNumber(x.Last),
                Open: formatNumber(x.Open),
                PrevClose: formatNumber(x.PrevClose),
                High: formatNumber(x.High),
                Low: formatNumber(x.Low),
                Change: formatNumber(x.Change),
                PctChange: formatNumber(x.Change),
                Volume: formatDataWithUnit(x.Volume),
                Turnover: formatDataWithUnit(x.Turnover),
                MarketCap: formatDataWithUnit(x.MarketCap),
                LastUpdate: new Date(x.LastUpdate),
            };
            return temp;
        });

        console.log('logger transform data1');
        console.time('transform1');
        for (const td of t_data_1) {
            try {
                await connection.connect();
                let quoteAastockRepo = connection.getRepository(Quote);
                await quoteAastockRepo.save(td);
                await connection.close();
            } catch (error) {
                if (connection.isConnected) {
                    await connection.close();
                }
            }
        }
        console.log('logger transform data2');
        console.time('transform2');
        for (const td of t_data_2) {
            try {
                await connection.connect();
                let quoteAastockRepo = connection.getRepository(Quote);
                await quoteAastockRepo.save(td);
                await connection.close();
            } catch (error) {
                if (connection.isConnected) {
                    await connection.close();
                }
            }
        }
        console.timeEnd('transform2');
    }
    catch (error) {
        console.error();
        if (connection.isConnected) {
            await connection.close();
        }
    }
}