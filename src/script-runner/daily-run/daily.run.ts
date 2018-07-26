import { RunSuspendCheckAsync } from '../suspension/suspension';
import { UpdateSymbolAsync } from '../update-stock-master/update_valid_symbol';
import { UpdateSymbolNameAsync } from '../update-stock-master/update_stock_master_name_cn';
import { QuoteAsync } from '../quote/quote';
import { RunAnalysisAsync } from '../analysis/analysis';

// plan to run the script daily with scheduler 

export async function RunQuoteAndAnalysisAsync() {
    await QuoteAsync(true, true, true);
    await RunAnalysisAsync();
}

export async function RunDailyAsync() {
    // 1. update the symbol.
    console.log('start running UpdateSymbolAsync');
    await UpdateSymbolAsync();
    console.log('start running UpdateSymbolNameAsync');
    await UpdateSymbolNameAsync();
    // 2. update the suspend state.
    console.log('start running RunSuspendCheckAsync');
    await RunSuspendCheckAsync();
    // 3. quote the stock.
    console.log('start running RunQuoteAndAnalysisAsync');
    await RunQuoteAndAnalysisAsync();
}

let daily = true;
if (daily) {
    RunDailyAsync();
} else {
    RunQuoteAndAnalysisAsync();
}

