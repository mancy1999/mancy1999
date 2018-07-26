var yahooFinance = require('yahoo-finance');
export async function yahoo_quote(_symbol: string, _modules: string[]): Promise<any> {
    try {
        return await yahooFinance.quote({
            symbol: _symbol,
            modules: _modules,       // optional; default modules.
        });
    } catch (error) {
        throw error;
    }
}
