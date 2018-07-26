import { AastockImporter } from './aastock/aastock.importer';
import { Importer } from './interface/import.interface';
import { YahooImporter } from './yahoo/yahoo.importer';

export class ImporterClass extends Importer {
    private importer: any = null;
    constructor(private importName: string = 'aastock') {
        super();
        if (importName == 'aastock') {
            this.importer = new AastockImporter();
        } else {
            this.importer = new YahooImporter();
        }
    }
    async quote(_symbol: string, _modules: string[]): Promise<any> {
        return await this.importer.quote(_symbol, _modules);
    }

    async quoteSymbols(_symbols: string[]): Promise<any> {
        let quotes: any[] = [];
        _symbols.forEach(async symbol => {
            let temp = await this.importer.quote(symbol);
            quotes.push(temp);
        });
        return quotes;
    }

    async quoteHistory(_symbol: string, _from: string = null, _to: string = null, _period: string = null): Promise<any> {
        return await this.importer.quoteHistory(_symbol, _from, _to, _period);
    }
}