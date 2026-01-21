import { createHash } from 'crypto';
function sortObjectKeys(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map(sortObjectKeys);
    }
    const sorted = {};
    const keys = Object.keys(obj).sort();
    for (const key of keys) {
        sorted[key] = sortObjectKeys(obj[key]);
    }
    return sorted;
}
export function generateHash(data) {
    const sortedData = sortObjectKeys(data);
    const json = JSON.stringify(sortedData);
    return createHash('sha256').update(json).digest('hex');
}
export function generateIdempotencyKey(tenantId, eventId, incentiveId, subjectId, depth) {
    const input = `${tenantId}:${eventId}:${incentiveId}:${subjectId}:${depth}`;
    return createHash('sha256').update(input).digest('hex');
}
export function generateUUID() {
    return crypto.randomUUID();
}
