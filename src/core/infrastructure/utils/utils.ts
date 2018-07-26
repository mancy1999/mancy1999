import { IOHLC, ICandlesTick } from '../model/stock.model';
let regression = require("regression");
export function ConvertDateToYYYYMMDD(date: Date): string {
    return date.toISOString().split("T")[0];
}

export function removeLeadZero(n: string) {
    return pad(Number(n), 4);
}

export function pad(n: any, width: number, z: any = '0') {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

export function Compute(data: ICandlesTick[]) {
    const dataSource = data.sort((a, b) => (a.Date > b.Date) ? 1 : -1);
    console.log(dataSource);
}

export function buildChartUrl(scheme: string, com: string, fontsize: string, stockid: string, period: number, type: string) {
    let prefix = `http://charts.aastocks.com/servlet/Charts?`;
    return `${prefix}scheme=${scheme}&com=${com}&fontsize=${fontsize}&lang=1&titlestyle=1&vol=1&stockid=${stockid}&period=${period}&type=${type}`;
}

// 用收市價來計
export async function getMaxAndMin(data: ICandlesTick[]) {
    let close: number[] = data.map(x => x.Close);
    let _max = Math.max(...close);
    let _min = Math.min(...close);
    return {
        max: _max,
        min: _min,
    };
}

export async function getAmplitude(data: ICandlesTick[]) {
    const compute_days = async (_data: ICandlesTick[], day: number) => {
        let temp_data = _data.slice(0, day);
        return await getMaxAndMin(temp_data);
    };
    const compute_months = async (_data: ICandlesTick[], month: number) => {
        let toDate = new Date();
        let d = new Date();
        d.setMonth(d.getMonth() - month);
        let temp_data = _data.filter(x => x.Date <= toDate && x.Date >= d);
        return await getMaxAndMin(temp_data);
    };
    let last_7_day_result = await compute_days(data, 7);
    let last_14_day_result = await compute_days(data, 14);
    let last_21_day_result = await compute_days(data, 21);
    let last_30_day_result = await compute_days(data, 30);
    let last_3_month_result = await compute_months(data, 3);
    let last_6_month_result = await compute_months(data, 6);
    let last_12_month_result = await compute_months(data, 12);
    return {
        last_7_day_max: last_7_day_result.max,
        last_7_day_min: last_7_day_result.min,
        last_14_day_max: last_14_day_result.max,
        last_14_day_min: last_14_day_result.min,
        last_21_day_max: last_21_day_result.max,
        last_21_day_min: last_21_day_result.min,
        last_30_day_max: last_30_day_result.max,
        last_30_day_min: last_30_day_result.min,
        last_3_month_max: last_3_month_result.max,
        last_3_month_min: last_3_month_result.min,
        last_6_month_max: last_6_month_result.max,
        last_6_month_min: last_6_month_result.min,
        last_12_month_max: last_12_month_result.max,
        last_12_month_min: last_12_month_result.min,
    };
}

export async function getPercentDiff(current: number, prev: number) {
    return Math.floor(current - prev) / prev * 100;
}

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
        last_7_day: last_7_day_result,
        last_14_day: last_14_day_result,
        last_21_day: last_21_day_result,
        last_30_day: last_30_day_result,
        last_3_month: last_3_month_result,
        last_6_month: last_6_month_result,
        last_12_month: last_12_month_result,
    };
}


export function ConvertToDaysList(data: number[], days: number) {
    let result: number[] = [];
    let source = data.slice();
    for (let i = 0; i < days; i++) {
        let temp = source.pop();
        result.unshift(temp);
    }
    return result;
}
