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
export declare function evaluateFlat(params: EvaluationParams): EvaluationOutput;
//# sourceMappingURL=flat.d.ts.map