import { generateHash, generateUUID } from '../utils/hash.js';
import { evaluateIncentives } from '../engine/evaluator.js';
import { TenantIsolationError, validateTenantIsolation } from '../utils/validation.js';
const SNAPSHOT_VERSION = '1.0.0';
export function generateIncentiveSnapshot(params) {
    const { tenantId, definitions, rules, relationships } = params;
    validateTenantIsolation(tenantId, definitions, rules, relationships);
    const filteredDefinitions = definitions.filter(d => d.tenantId === tenantId);
    const filteredRules = rules.filter(r => r.tenantId === tenantId);
    const filteredRelationships = relationships.filter(r => r.tenantId === tenantId);
    const dataToHash = {
        version: SNAPSHOT_VERSION,
        definitions: filteredDefinitions,
        rules: filteredRules,
        relationships: filteredRelationships
    };
    const hash = generateHash(dataToHash);
    return {
        id: generateUUID(),
        tenantId,
        version: SNAPSHOT_VERSION,
        definitions: [...filteredDefinitions],
        rules: [...filteredRules],
        relationships: [...filteredRelationships],
        hash,
        createdAt: new Date().toISOString()
    };
}
export function evaluateFromSnapshot(snapshot, context) {
    if (snapshot.tenantId !== context.tenantId) {
        throw new TenantIsolationError(`Snapshot tenant ${snapshot.tenantId} does not match context tenant ${context.tenantId}`);
    }
    return evaluateIncentives(snapshot.definitions, snapshot.rules, snapshot.relationships, context);
}
export function verifySnapshotIntegrity(snapshot) {
    const dataToHash = {
        version: snapshot.version,
        definitions: snapshot.definitions,
        rules: snapshot.rules,
        relationships: snapshot.relationships
    };
    const calculatedHash = generateHash(dataToHash);
    const isValid = calculatedHash === snapshot.hash;
    const result = {
        isValid,
        expectedHash: snapshot.hash,
        actualHash: calculatedHash
    };
    if (!isValid) {
        result.tamperedFields = ['unknown'];
    }
    return result;
}
