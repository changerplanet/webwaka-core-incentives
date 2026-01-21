import type { IncentiveDefinition, IncentiveRule, IncentiveRelationship, IncentiveEvaluationContext, IncentiveResult, IncentiveSnapshot } from '../models/types.js';
export interface GenerateSnapshotParams {
    tenantId: string;
    definitions: readonly IncentiveDefinition[];
    rules: readonly IncentiveRule[];
    relationships: readonly IncentiveRelationship[];
}
export declare function generateIncentiveSnapshot(params: GenerateSnapshotParams): IncentiveSnapshot;
export declare function evaluateFromSnapshot(snapshot: IncentiveSnapshot, context: IncentiveEvaluationContext): IncentiveResult[];
export interface SnapshotVerificationResult {
    isValid: boolean;
    expectedHash: string;
    actualHash: string;
    tamperedFields?: string[];
}
export declare function verifySnapshotIntegrity(snapshot: IncentiveSnapshot): SnapshotVerificationResult;
//# sourceMappingURL=snapshot.d.ts.map