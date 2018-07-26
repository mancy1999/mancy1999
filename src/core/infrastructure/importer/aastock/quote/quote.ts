import { pad } from '../../../utils/utils';
import axios from 'axios';

export async function aastock_quote(_symbol: string, _modules: string[] = null): Promise<any> {
    try {
        // http://www.aastocks.com/apps/data/iphone/GetRTQuote.ashx?Symbol=1&DataType=1&language=ch&ls=1
        let prefix_url = 'http://www.aastocks.com/apps/data/iphone/GetRTQuote.ashx?Symbol=';
        let postfix_url = '&DataType=1&language=ch&ls=1';
        const url = prefix_url + pad(_symbol, 5) + postfix_url;
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'charset=UTF-8' },
            url,
        };
        return await axios(options);
    } catch (error) {
        throw error;
    }
}


