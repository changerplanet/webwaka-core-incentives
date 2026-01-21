import { TenantIsolationError } from '../utils/validation.js';
function canonicalRound(value) {
    return Math.round((value + Number.EPSILON) * 100) / 100;
}
export function evaluateMultiLevel(params) {
    const { definition, inputValue, depth } = params;
    const maxDepth = definition.maxDepth ?? 1;
    const depthRates = definition.depthRates ?? [];
    if (depth > maxDepth || depth < 1) {
        return {
            amount: 0,
            calculation: `multiLevel(depth ${depth} exceeds max ${maxDepth})`
        };
    }
    const rateIndex = depth - 1;
    const rate = depthRates[rateIndex] ?? 0;
    const rawAmount = (inputValue * rate) / 100;
    const amount = canonicalRound(rawAmount);
    return {
        amount,
        calculation: `multiLevel(depth ${depth}: ${inputValue} * ${rate}% = ${amount})`
    };
}
export function buildReferralChain(params) {
    const { subjectId, relationships, maxDepth, tenantId } = params;
    const chain = [];
    const visited = new Set();
    let currentId = subjectId;
    let currentDepth = 1;
    const sortedRelationships = [...relationships].sort((a, b) => a.id.localeCompare(b.id));
    while (currentDepth <= maxDepth) {
        const relationship = sortedRelationships.find(r => r.refereeId === currentId && r.isActive);
        if (!relationship)
            break;
        if (relationship.tenantId !== tenantId) {
            throw new TenantIsolationError(`Referral relationship ${relationship.id} belongs to tenant ${relationship.tenantId}, not ${tenantId}`);
        }
        if (visited.has(relationship.referrerId)) {
            break;
        }
        visited.add(relationship.referrerId);
        chain.push({ referrerId: relationship.referrerId, depth: currentDepth });
        currentId = relationship.referrerId;
        currentDepth++;
    }
    return chain;
}
