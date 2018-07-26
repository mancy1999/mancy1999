export interface IQuarterly {
    date: string;
    actual: number;
    estimate: number;
}

export interface IEarningsChart {
    quarterly: IQuarterly[];
    currentQuarterEstimate: number;
    currentQuarterEstimateDate: string;
    currentQuarterEstimateYear: number;
}

export interface IYearly {
    date: number;
    actual: number;
    estimate: number;
}

export interface IFinancialsChart {
    yearly: IQuarterly[];
}

export interface IEarnings {
    maxAge: number;
    earningsChart: IEarningsChart;
    financialsChart: IFinancialsChart;
}
