
import { Connection } from 'typeorm/connection/Connection';
import { ConnectionManager } from 'typeorm/connection/ConnectionManager';
import { getConnectionOptions } from 'typeorm';
import { StockMasterRepo } from '../../dal/stock/StockMasterRepo';
import { Quote } from '../../entities/Quote';
// import { pad, removeLeadZero } from '../../stock/utils/utils';
import { AastockImporter } from '../../core/infrastructure/importer/aastock/aastock.importer';
import { removeLeadZero } from '../../core/infrastructure/utils/utils';

// this script write to update the suspension for stock master
export async function RunSuspendCheckAsync() {
    let importer = new AastockImporter();
    let connection: Connection;
    let quote_result = [];
    try {
        const connectionManager = new ConnectionManager();
        const connectionOptions = await getConnectionOptions();
        connection = connectionManager.create(connectionOptions);
        await connection.connect();
        let stockMasterRepo = new StockMasterRepo(connection);
        console.log('connecting to db...');

        let SB_symbols = await stockMasterRepo.findSB();
        let GEM_symbols = await stockMasterRepo.findGEM();

        // get the SB 主板 & 創業板 
        console.log('getting stock master...');
        let SB_symbols_list = SB_symbols.map(x => x.Symbol_Aastock).slice(0, 80);
        let GEM_symbols_list = GEM_symbols.map(x => x.Symbol_Aastock).slice(0, 80);
        console.log('done get stock master...');
        await connection.close();

        console.log(`主板: ${SB_symbols_list.length} symbols..`);
        console.log(`創業板: ${GEM_symbols_list.length} symbols..`);
        for (const quote of SB_symbols_list) {
            try {
                console.log(`quote...${quote}`);
                let temp_ = await importer.quote(quote);
                quote_result.push(temp_);
            } catch (error) {
                console.log(error);
                continue;
            }
        }
        for (const quote of GEM_symbols_list) {
            try {
                console.log(`quote...${quote}`);
                let temp_ = await importer.quote(quote);
                quote_result.push(temp_);
            } catch (error) {
                console.log(error);
                continue;
            }
        }

        // ensure the symbol is correct here.
        await connection.connect();
        for (const qr of quote_result) {
            try {
                if (qr.Suspension == 'Y') {
                    console.log(`the quote..${qr.Symbol} has suspension`);
                    await stockMasterRepo.subscribeToSuspend(removeLeadZero(qr.Symbol));
                } else if (qr.Suspension == 'N') {
                    console.log(`the quote..${qr.Symbol} has no suspend`);
                    await stockMasterRepo.unsubscribeToSuspend(removeLeadZero(qr.Symbol));
                } else {
                    console.error('exceptonal case for suspend');
                }
            } catch (error) {
                console.log(error);
                continue;
            }
        }
    }
    catch (error) {
        console.error();
        if (connection.isConnected) {
            await connection.close();
        }
    }
    finally {
        // tidy up the connection;
        if (connection.isConnected) {
            await connection.close();
        }
    }
}

try {
    RunSuspendCheckAsync();
} catch (error) {
    console.log(error);
}
