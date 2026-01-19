import type { EvaluationParams, EvaluationOutput } from './flat.js';

export function evaluatePercentage(params: EvaluationParams): EvaluationOutput {
  const { definition, rule, inputValue } = params;
  
  const percentage = rule?.overridePercentage ?? definition.percentage ?? 0;
  const amount = (inputValue * percentage) / 100;
  
  return {
    amount: Math.round(amount * 100) / 100,
    calculation: `percentage(${inputValue} * ${percentage}% = ${amount})`
  };
}
