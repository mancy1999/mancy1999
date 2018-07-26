import { Importer } from '../interface/import.interface';
import { aastock_quote } from './quote/quote';
var parser = require('xml2json');

export class AastockImporter extends Importer {
    async quote(_symbol: string, _modules: string[] = null): Promise<any> {
        let res = await aastock_quote(_symbol);
        try {
            var json = parser.toJson(res.data, {
                object: true,
            });
            return json.Root.StockQuote.Quote;
        } catch (error) {
            throw error;
        }
    }
    async quoteHistory(_symbol: string, _from: string, _to: string, _period: string): Promise<any> {
        throw new Error('Method not implemented.');
    }
}
