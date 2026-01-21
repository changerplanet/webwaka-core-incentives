import { IncentiveDefinition, IncentiveRule, IncentiveRelationship } from '../models/types.js';
export declare class TenantIsolationError extends Error {
    constructor(message: string);
}
export declare function validateTenantIsolation(tenantId: string, definitions: readonly IncentiveDefinition[], rules: readonly IncentiveRule[], relationships: readonly IncentiveRelationship[]): void;
export declare function validateReferralChainTenantScope(tenantId: string, relationships: readonly IncentiveRelationship[]): void;
//# sourceMappingURL=validation.d.ts.map