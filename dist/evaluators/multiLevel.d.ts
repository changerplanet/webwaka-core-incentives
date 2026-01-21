import type { IncentiveDefinition, IncentiveRelationship } from '../models/types.js';
export interface MultiLevelParams {
    definition: IncentiveDefinition;
    inputValue: number;
    depth: number;
}
export interface MultiLevelOutput {
    amount: number;
    calculation: string;
}
export declare function evaluateMultiLevel(params: MultiLevelParams): MultiLevelOutput;
export interface BuildChainParams {
    subjectId: string;
    relationships: readonly IncentiveRelationship[];
    maxDepth: number;
    tenantId: string;
}
export declare function buildReferralChain(params: BuildChainParams): Array<{
    referrerId: string;
    depth: number;
}>;
//# sourceMappingURL=multiLevel.d.ts.map