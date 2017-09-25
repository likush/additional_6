module.exports = function zeros(expression) {
    let expressionParts = expression.split('*');
    expressionParts = expressionParts.map(part => {
        let n = part.replace(/!/g, '');
        let gap = part.match(/!/g).length;
        return nFactorial(n, gap)
    });

    let total = 1;
    expressionParts.forEach(part => {
        total *= part;
    });

    const matchedZeros = String(total).match(/0*$/g);
    return matchedZeros[0].length;
};

function nFactorial(n, gap) {
    let ni = n - gap, result = n;

    while (ni >= gap) {
        result *= ni;
        ni -= gap;
    }

    return result;
}