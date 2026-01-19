import type { IncentiveDefinition, IncentiveRule } from '../models/types.js';

export interface EvaluationParams {
  definition: IncentiveDefinition;
  rule?: IncentiveRule;
  inputValue: number;
}

export interface EvaluationOutput {
  amount: number;
  calculation: string;
}

export function evaluateFlat(params: EvaluationParams): EvaluationOutput {
  const { definition, rule, inputValue } = params;
  
  const amount = rule?.overrideAmount ?? definition.flatAmount ?? 0;
  
  return {
    amount,
    calculation: `flat(${amount})`
  };
}
