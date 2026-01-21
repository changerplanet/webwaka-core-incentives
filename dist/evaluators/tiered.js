function canonicalRound(value) {
    return Math.round((value + Number.EPSILON) * 100) / 100;
}
export function evaluateTiered(params) {
    const { definition, rule, inputValue } = params;
    const tiers = rule?.overrideTiers ?? definition.tiers ?? [];
    if (tiers.length === 0) {
        return { amount: 0, calculation: 'tiered(no tiers defined)' };
    }
    const sortedTiers = [...tiers].sort((a, b) => a.minValue - b.minValue);
    let applicableTier;
    for (const tier of sortedTiers) {
        if (inputValue >= tier.minValue) {
            if (tier.maxValue === undefined || inputValue <= tier.maxValue) {
                applicableTier = tier;
            }
        }
    }
    if (!applicableTier) {
        return { amount: 0, calculation: 'tiered(no applicable tier)' };
    }
    let amount;
    let calculation;
    if (applicableTier.flatAmount !== undefined) {
        amount = applicableTier.flatAmount;
        calculation = `tiered(tier ${applicableTier.minValue}-${applicableTier.maxValue ?? '∞'}: flat ${amount})`;
    }
    else {
        const rawAmount = (inputValue * applicableTier.rate) / 100;
        amount = canonicalRound(rawAmount);
        calculation = `tiered(tier ${applicableTier.minValue}-${applicableTier.maxValue ?? '∞'}: ${inputValue} * ${applicableTier.rate}% = ${amount})`;
    }
    return {
        amount,
        calculation
    };
}
