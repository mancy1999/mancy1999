import { quoteType } from '../../core/infrastructure/importer/yahoo/quote/enum/quoteType';
import { yahoo_quote } from '../../core/infrastructure/importer/yahoo/quote/quote';

async function test_yahoo_quote_with_modules() {
    let modules = [quoteType.summaryDetail, quoteType.price, quoteType.financialData, quoteType.earnings, quoteType.defaultKeyStatistics];
    let data = await yahoo_quote('1800.HK', modules);
    let defaultKeyStatistics = data[quoteType.defaultKeyStatistics];
    console.log(defaultKeyStatistics);
    let earnings = data[quoteType.earnings];
    console.log(earnings);
    let financialData = data[quoteType.financialData];
    console.log(financialData);
    let price = data[quoteType.price];
    console.log(price);
    let summaryDetail = data[quoteType.summaryDetail];
    console.log(summaryDetail);
}

test_yahoo_quote_with_modules();