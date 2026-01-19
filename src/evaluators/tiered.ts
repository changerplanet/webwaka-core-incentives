import type { Tier } from '../models/types.js';
import type { EvaluationParams, EvaluationOutput } from './flat.js';

export function evaluateTiered(params: EvaluationParams): EvaluationOutput {
  const { definition, rule, inputValue } = params;
  
  const tiers = rule?.overrideTiers ?? definition.tiers ?? [];
  
  if (tiers.length === 0) {
    return { amount: 0, calculation: 'tiered(no tiers defined)' };
  }

  const sortedTiers = [...tiers].sort((a, b) => a.minValue - b.minValue);
  
  let applicableTier: Tier | undefined;
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

  let amount: number;
  let calculation: string;

  if (applicableTier.flatAmount !== undefined) {
    amount = applicableTier.flatAmount;
    calculation = `tiered(tier ${applicableTier.minValue}-${applicableTier.maxValue ?? '∞'}: flat ${amount})`;
  } else {
    amount = (inputValue * applicableTier.rate) / 100;
    calculation = `tiered(tier ${applicableTier.minValue}-${applicableTier.maxValue ?? '∞'}: ${inputValue} * ${applicableTier.rate}% = ${amount})`;
  }

  return {
    amount: Math.round(amount * 100) / 100,
    calculation
  };
}
