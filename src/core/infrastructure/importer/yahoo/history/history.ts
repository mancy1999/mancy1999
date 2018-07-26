
let yahooFinance = require('yahoo-finance');
import { ICandlesTick } from './../../../model/stock.model';
import { Observable } from 'rxjs';
import { ConvertDateToYYYYMMDD } from '../../../utils/utils';
import { Period } from '../../../enum/Periodd';

let MIN_DATE = '2016-01-01';
let MAX_DATE = ConvertDateToYYYYMMDD(new Date());

export async function yahoo_quote_history(_symbol: string, _from: string = MIN_DATE,
    _to: string = MAX_DATE, _period: string = Period.daily): Promise<any> {
    try {
        let dataSource = await yahooFinance.historical({
            symbol: _symbol,
            from: _from,
            to: _to,
            // period: _period,
        });
        return dataSource.map((data: any) => (
            {
                Date: data.date,
                Volume: data.volume,
                High: data.high,
                Open: data.open,
                Low: data.low,
                Close: data.close,
            } as ICandlesTick
        ));
    } catch (error) {
        console.log(error);
        throw error;
    }
}