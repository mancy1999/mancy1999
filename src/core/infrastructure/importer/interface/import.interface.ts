export abstract class Importer {
    abstract quote(_symbol: string, _modules: string[]): Promise<any>;
    abstract quoteHistory(_symbol: string, _from: string, _to: string, _period: string): Promise<any>;
}