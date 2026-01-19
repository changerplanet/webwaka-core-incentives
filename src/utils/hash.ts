import { createHash } from 'crypto';

function sortObjectKeys(obj: unknown): unknown {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(sortObjectKeys);
  }
  
  const sorted: Record<string, unknown> = {};
  const keys = Object.keys(obj as Record<string, unknown>).sort();
  
  for (const key of keys) {
    sorted[key] = sortObjectKeys((obj as Record<string, unknown>)[key]);
  }
  
  return sorted;
}

export function generateHash(data: unknown): string {
  const sortedData = sortObjectKeys(data);
  const json = JSON.stringify(sortedData);
  return createHash('sha256').update(json).digest('hex');
}

export function generateIdempotencyKey(
  tenantId: string,
  eventId: string,
  incentiveId: string,
  subjectId: string,
  depth: number
): string {
  const input = `${tenantId}:${eventId}:${incentiveId}:${subjectId}:${depth}`;
  return createHash('sha256').update(input).digest('hex');
}

export function generateUUID(): string {
  return crypto.randomUUID();
}
