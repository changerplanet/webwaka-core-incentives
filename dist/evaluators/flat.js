export function evaluateFlat(params) {
    const { definition, rule, inputValue } = params;
    const amount = rule?.overrideAmount ?? definition.flatAmount ?? 0;
    return {
        amount,
        calculation: `flat(${amount})`
    };
}
