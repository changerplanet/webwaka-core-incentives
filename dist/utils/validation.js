export class TenantIsolationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'TenantIsolationError';
    }
}
export function validateTenantIsolation(tenantId, definitions, rules, relationships) {
    for (const def of definitions) {
        if (def.tenantId !== tenantId) {
            throw new TenantIsolationError(`Definition ${def.id} belongs to tenant ${def.tenantId}, not ${tenantId}`);
        }
    }
    for (const rule of rules) {
        if (rule.tenantId !== tenantId) {
            throw new TenantIsolationError(`Rule ${rule.id} belongs to tenant ${rule.tenantId}, not ${tenantId}`);
        }
    }
    for (const rel of relationships) {
        if (rel.tenantId !== tenantId) {
            throw new TenantIsolationError(`Relationship ${rel.id} belongs to tenant ${rel.tenantId}, not ${tenantId}`);
        }
    }
}
export function validateReferralChainTenantScope(tenantId, relationships) {
    const allParticipants = new Set();
    for (const rel of relationships) {
        if (rel.tenantId !== tenantId) {
            throw new TenantIsolationError(`Referral chain contains relationship from different tenant: ${rel.tenantId}`);
        }
        allParticipants.add(rel.referrerId);
        allParticipants.add(rel.refereeId);
        rel.chain.forEach(id => allParticipants.add(id));
    }
}
