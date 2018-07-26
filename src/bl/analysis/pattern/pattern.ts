const predictPattern = require('technicalindicators').predictPattern;
const hasDoubleBottom = require('technicalindicators').hasDoubleBottom;
const hasDoubleTop = require('technicalindicators').hasDoubleTop;
const hasHeadAndShoulder = require('technicalindicators').hasHeadAndShoulder;
const hasInverseHeadAndShoulder = require('technicalindicators').hasInverseHeadAndShoulder;
const isTrendingUp = require('technicalindicators').isTrendingUp;
const isTrendingDown = require('technicalindicators').isTrendingDown;

export enum AvailablePatterns {
    'TD',
    'IHS',
    'HS',
    'TU',
    'DT',
    'DB',
}

export async function PatternDetection(close: number[], probability: number = 80, days: number = 250) {
    let input = close.slice(0, close.length >= days ? days : close.length);
    let result = await predictPattern({ values: input });
    return {
        hasDoubleBottom: (result.patternId === AvailablePatterns.DB && result.probability > probability),
        hasDoubleTop: (result.patternId === AvailablePatterns.DT && result.probability > probability),
        hasHeadAndShoulder: (result.patternId === AvailablePatterns.HS && result.probability > probability),
        hasInverseHeadAndShoulder: (result.patternId === AvailablePatterns.IHS && result.probability > probability),
        isTrendingUp: (result.patternId === AvailablePatterns.TU && result.probability > probability),
        isTrendingDown: (result.patternId === AvailablePatterns.TD && result.probability > probability),
    };
}
