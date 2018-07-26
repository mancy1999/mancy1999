
import * as schedule from 'node-schedule';
import { QuoteAsync } from '../script-runner/quote/quote';
import { RunAnalysisAsync } from '../script-runner/analysis/analysis';
import { UpdateSymbolAsync } from '../script-runner/update-stock-master/update_valid_symbol';
import { UpdateSymbolNameAsync } from '../script-runner/update-stock-master/update_stock_master_name_cn';
import { RunSuspendCheckAsync } from '../script-runner/suspension/suspension';

export async function RunQuoteAndAnalysisAsync() {
    await QuoteAsync(true, true, true);
    await RunAnalysisAsync();
}

export async function RunDailyAsync() {
    // 1. update the symbol.
    await UpdateSymbolAsync();
    await UpdateSymbolNameAsync();
    // 2. update the suspend state.
    await RunSuspendCheckAsync();
    // 3. quote the stock.
    await RunQuoteAndAnalysisAsync();
}

try {
    var rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = [new schedule.Range(1, 5)];
    rule.hour = 18;
    rule.minute = 0;
    console.log('starting the job');
    let j = schedule.scheduleJob(rule, () => {
        RunDailyAsync();
        j.invoke();
    });
    j.invoke();
} catch (error) {
    console.log(error);
}
