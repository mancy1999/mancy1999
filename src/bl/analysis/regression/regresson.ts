let regression = require("regression");

export interface IRegressionResult {
    gradient: number;
    yIntercept: number;
}

function regress(data: number[][]): IRegressionResult {
    try {
        const result = regression.linear(data, {
            precision: 6,
        });
        let _gradient = result.equation[0];
        let _yIntercept = result.equation[1];

        return {
            gradient: _gradient,
            yIntercept: _yIntercept,
        } as IRegressionResult;
    } catch (error) {
        throw (error);
    }
}

export async function RegressionCompute(close: number[], days: number = 14) {
    let _close = close.slice(0, close.length >= days ? days : close.length);
    _close = _close.reverse();
    let input = [];
    let count = days;
    for (let i = _close.length - 1; count >= 0 && i >= 0; i--) {
        let temp = [];
        temp.push(count);
        temp.push(_close[i]);
        input.unshift(temp);
        count--;
    }
    let regression_result = regress(input);
    return regression_result;
}

