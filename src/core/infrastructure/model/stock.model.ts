export interface IOHLC {
    Open: number;
    High: number;
    Low: number;
    Close: number;
}

export interface ICandlesTick extends IOHLC {
    Volume: number;
    Date: Date;
}