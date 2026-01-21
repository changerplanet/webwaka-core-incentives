function canonicalRound(value) {
    return Math.round((value + Number.EPSILON) * 100) / 100;
}
export function evaluatePercentage(params) {
    const { definition, rule, inputValue } = params;
    const percentage = rule?.overridePercentage ?? definition.percentage ?? 0;
    const rawAmount = (inputValue * percentage) / 100;
    const amount = canonicalRound(rawAmount);
    return {
        amount,
        calculation: `percentage(${inputValue} * ${percentage}% = ${amount})`
    };
}
