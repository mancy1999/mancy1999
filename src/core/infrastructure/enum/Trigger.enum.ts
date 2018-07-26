export enum Trigger {
    EMA5_LARGER_THAN_EMA5 = 1,
    EMA5_LARGER_THAN_EMA20 = 2,
    EMA10_LARGER_THAN_EMA20 = 3, // head shoulder
    EMA50_LARGER_THAN_EMA250 = 4, // inverse head shoulder
    EMA5_SMALLER_THAN_EMA5 = 5,
    EMA5_SMALLER_THAN_EMA20 = 6,
    EMA10_SMALLER_THAN_EMA20 = 7, // head shoulder
    EMA50_SMALLER_THAN_EMA250 = 8, // inverse head shoulder
    Volume_LARGER_THAN_Daily_10 = 9,
}
