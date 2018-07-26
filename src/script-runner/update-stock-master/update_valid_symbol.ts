import { createConnection, Connection } from 'typeorm';
import { StockMasterRepo } from '../../dal/stock/StockMasterRepo';
import { pad } from '../../core/infrastructure/utils/utils';
import { AastockImporter } from '../../core/infrastructure/importer/aastock/aastock.importer';

export async function UpdateSymbolAsync() {
    // will get the orm config.
    let connection = await createConnection();
    try {
        for (let i = 1; i < 3000; i++) {
            try {
                await update_symbol(i, connection);
            } catch (error) {
                continue;
            }
        }
        for (let j = 3001; j < 6000; j++) {
            try {
                await update_symbol(j, connection);
            } catch (error) {
                continue;
            }
        }

        for (let k = 6001; k < 9000; k++) {
            try {
                await update_symbol(k, connection);
            } catch (error) {
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
        console.log('update symbol');
    }
}

async function update_symbol(i: number, conn: Connection) {
    let _symbol = pad(i, 4);
    let quote = await new AastockImporter().quote(_symbol);
    if (quote) {
        if (quote.QuoteType == 'S') {
            let stockMasterRepo = new StockMasterRepo(conn);
            let result = await stockMasterRepo.findOneBySymbol(_symbol);
            if (!result) {
                await stockMasterRepo.create({
                    ID: null,
                    Symbol: _symbol,
                    Name: quote.Desp,
                    Symbol_Yahoo: `${_symbol}.HK`,
                    Symbol_Aastock: quote.Symbol,
                    SHC: false,
                    SZC: false,
                    AH: false,
                    MSCI: false,
                    WATCH: false,
                    SUSPEND: false,
                    CreateDate: new Date(),
                    EditDate: null,
                    Name_CN: quote.Desp,
                    IGNORE: false,
                    SB: false,
                    GEM: false,
                    ETF: false,
                });
                console.log(`created stock master ${_symbol}`);
            }
        }
    }
}

// this function update the symbol if not exsisting.
UpdateSymbolAsync();
