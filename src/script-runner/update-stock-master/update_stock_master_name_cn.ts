import { createConnection, Connection } from 'typeorm';
import { StockMasterRepo } from '../../dal/stock/StockMasterRepo';
import { StockMaster } from '../../entities/StockMaster';
import { AastockImporter } from '../../core/infrastructure/importer/aastock/aastock.importer';

export async function UpdateSymbolNameAsync() {
    // will get the orm config.
    let connection = await createConnection();
    try {
        let stockMasterRepo = new StockMasterRepo(connection);
        let stocks = await stockMasterRepo.findAll();
        for (let stock of stocks) {
            try {
                await update_symbol_name(stock, connection);
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

async function update_symbol_name(stock: StockMaster, conn: Connection) {
    let quote = await new AastockImporter().quote(stock.Symbol);
    if (quote) {
        if (quote.QuoteType == 'S') {
            let stockMasterRepo = new StockMasterRepo(conn);
            let result = await stockMasterRepo.findOneBySymbol(stock.Symbol);
            if (result) {
                result.Name_CN = quote.Desp;
                try {
                    await stockMasterRepo.update(result.ID, result);
                } catch (error) {
                    console.log(error);
                    throw (error);
                }
            }
        }
    }
}

UpdateSymbolNameAsync();
