import { AastockImporter } from '../../stock/importer/aastock/aastock.importer';
import { formatDataWithUnit, formatNumber } from '../../stock/utils/formatter';
import { pad } from '../../stock/utils/utils';


async function debug() {
    let importer = new AastockImporter();
    let quote_result = [];
    let temp_ = await importer.quote('02380');
    console.log(temp_);
    quote_result.push(temp_);

    let t_data = quote_result.map((x: any) => {
        let temp = {
            Symbol: pad(x.Symbol, 4),
            Symbol_Aastock: x.Symbol,
            Desp: x.Desp,
            Last: formatNumber(x.Last),
            Open: formatNumber(x.Open),
            PrevClose: formatNumber(x.PrevClose),
            High: formatNumber(x.High),
            Low: formatNumber(x.Low),
            Change: formatNumber(x.Change),
            PctChange: formatNumber(x.PctChange),
            Volume: formatDataWithUnit(x.Volume),
            Turnover: formatDataWithUnit(x.Turnover),
            MarketCap: formatDataWithUnit(x.MarketCap),
            LastUpdate: new Date(x.LastUpdate),
        };
        return temp;
    });
    console.log(t_data);
}
debug();