export enum BBTrigger {
    BB_HT_UPPER = 'BB_1',
    BB_LT_UPPER_HT_MIDDLE = 'BB_2',
    BB_MIDDLE = 'BB_3',
    BB_LT_MIDLE_HT_LOWER = 'BB_4',
    BB_LT_LOWER = 'BB_5',
}

export function BBTriggerCompute(last: number, upper: number, middle: number, lower: number) {
    if (last > upper) {
        return BBTrigger.BB_HT_UPPER;
    } else if (last <= upper && last > middle) {
        return BBTrigger.BB_LT_UPPER_HT_MIDDLE;
    } else if (last >= middle) {
        return BBTrigger.BB_MIDDLE;
    } else if (last < middle && last >= lower) {
        return BBTrigger.BB_LT_MIDLE_HT_LOWER;
    } else {
        return BBTrigger.BB_LT_LOWER;
    }
}




