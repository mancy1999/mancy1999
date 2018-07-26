export function formatDataWithUnit(input: string, language: string = 'ch') {
    const ch_keys = [{
        key: '億',
        value: 100000000,
    }, {
        key: '千萬',
        value: 10000000,
    }, {
        key: '百萬',
        value: 1000000,
    }, {
        key: '萬',
        value: 10000,
    }, {
        key: '千',
        value: 1000,
    }];

    const en_keys = [{
        key: 'B',
        value: 1000000000,
    }, {
        key: 'M',
        value: 1000000,
    }, {
        key: 'K',
        value: 1000,
    }];

    input = input.replace(',', '');
    if (language == 'ch') {
        for (let obj of ch_keys) {
            if (input.indexOf(obj.key) > 0) {
                try {
                    let data = input.replace(obj.key, '');
                    let result = Number(data) * obj.value;
                    return result;
                } catch (error) {
                    console.log(error);
                    throw error;
                }
            }
        }
        if (input == 'N/A') {
            return 0;
        } else {
            try {
                return Number(input);
            } catch (error) {
                console.log(error);
                return 0;
            }
        }
    } else {
        for (let obj of en_keys) {
            if (input.indexOf(obj.key) > 0) {
                try {
                    let data = input.replace(obj.key, '');
                    let result = Number(data) * obj.value;
                    return result;
                } catch (error) {
                    console.log(error);
                    throw error;
                }
            }
        }
        if (input == 'N/A') {
            return 0;
        } else {
            try {
                return Number(input);
            } catch (error) {
                console.log(error);
                return 0;
            }
        }
    }
}

export function formatNumber(input: string) {
    try {
        if (input == 'N/A') {
            return 0;
        } else {
            return Number(input);
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}
