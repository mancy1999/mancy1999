import { Importer } from '../interface/import.interface';
import { yahoo_quote } from './quote/quote';
import { yahoo_quote_history } from './history/history';
import { Period } from '../../enum/Periodd';

export class YahooImporter extends Importer {
    async quote(_symbol: string, _modules: string[]): Promise<any> {
        return await yahoo_quote(_symbol, _modules);
    }
    async quoteHistory(_symbol: string, _from: string = null, _to: string = null, _period: string = Period.daily): Promise<any> {
        return await yahoo_quote_history(_symbol, _from, _to, _period);
    }
}