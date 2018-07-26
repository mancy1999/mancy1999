
import axios from 'axios';

export async function index_quote(): Promise<any> {
    try {
        const url = 'http://www.aastocks.com/tc/resources/datafeed/getstockindex.ashx?type=5';
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
