module.exports = function zeros(expression) {
    let expressionParts = expression.split('*');
    expressionParts = expressionParts.map(part => {
        let n = part.replace(/!/g, '');
        let gap = String(part.match(/!/g).length);
        return nFactorial(n, gap)
    });

    let total = '1';
    expressionParts.forEach(part => {
        total = multiply(total, part);
    });

    const matchedZeros = total.match(/0*$/g);
    return matchedZeros[0].length;
};

function nFactorial(n, gap) {
    let ni = substract(n, gap), result = n;

    while (Number(ni) >= Number(gap)) {
        result = multiply(result, ni);
        ni = substract(ni, gap);
    }

    return result
}

function multiply(first, second) {
    first = first.split('').reverse();
    second = second.split('').reverse();
    const result = [];

    for (let i = 0; i < first.length; i++) {
        for (let j = 0; j < second.length; j++) {
            result[i + j] = result[i + j] || 0;
            result[i + j] += first[i] * second[j];
        }
    }

    for (let i = 0; i < result.length; i++) {
        if (result[i] >= 10) {
            result[i + 1] = (result[i + 1] || 0) + parseInt(result[i] / 10);
            result[i] %= 10;
        }
    }
    return result.reverse().join('');
}

function substract(first, second) {
    const maxInt = Number.MAX_SAFE_INTEGER;
    if (Number(first) < maxInt && Number(second) < maxInt) {
        return String(first - second);
    }

    first = first.split('').reverse();
    second = second.split('').reverse();
    const result = [];

    const iterations = Math.max(first.length, second.length);
    for (let i = 0; i < iterations; i++) {
        result[i] = (first[i] || 0) - (second[i] || 0);
    }

    for (let i = 0; i < result.length; i++) {
        if (result[i] < 0) {
            result[i] = result[i] + 10;
            result[i + 1] = (result[i + 1] || 0) - 1;
        }
    }

    return result.reverse().join('');
}