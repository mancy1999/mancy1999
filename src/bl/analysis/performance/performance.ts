import { ICandlesTick } from '../../../core/infrastructure/model/stock.model';
export async function getPerformance(data: ICandlesTick[]) {
    const compute_days = async (_data: ICandlesTick[], day: number) => {
        let temp_data = _data.slice(0, day).map(x => x.Close);
        return await getPercentDiff(temp_data.shift(), temp_data.pop());
    };
    const compute_months = async (_data: ICandlesTick[], month: number) => {
        let toDate = new Date();
        let d = new Date();
        d.setMonth(d.getMonth() - month);
        let temp_data = _data.filter(x => x.Date <= toDate && x.Date >= d).map(x => x.Close);
        return await getPercentDiff(temp_data.shift(), temp_data.pop());
    };

    let last_7_day_result = await compute_days(data, 7);
    let last_14_day_result = await compute_days(data, 14);
    let last_21_day_result = await compute_days(data, 21);
    let last_30_day_result = await compute_days(data, 30);
    let last_3_month_result = await compute_months(data, 3);
    let last_6_month_result = await compute_months(data, 6);
    let last_12_month_result = await compute_months(data, 12);
    return {
        last_7_day: Math.round(last_7_day_result * 100) / 100,
        last_14_day: Math.round(last_14_day_result * 100) / 100,
        last_21_day: Math.round(last_21_day_result * 100) / 100,
        last_30_day: Math.round(last_30_day_result * 100) / 100,
        last_3_month: Math.round(last_3_month_result * 100) / 100,
        last_6_month: Math.round(last_6_month_result * 100) / 100,
        last_12_month: Math.round(last_12_month_result * 100) / 100,
    };
}

export async function getPercentDiff(current: number, prev: number) {
    return Math.floor(current - prev) / prev * 100;
}
