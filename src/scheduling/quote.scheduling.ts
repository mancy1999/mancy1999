import * as schedule from 'node-schedule';
import { QuoteAsync } from '../script-runner/quote/quote';

try {
    let j = schedule.scheduleJob('*/5 * * * *', () => {
        let now = new Date();
        if (now.getHours() >= 9 && now.getHours() <= 12) {
            QuoteAsync();
        } else if (now.getHours() >= 13 && now.getHours() <= 17) {
            QuoteAsync();
        }
    });
    j.invoke(); // start it now.
} catch (error) {
    console.log(error);
}
