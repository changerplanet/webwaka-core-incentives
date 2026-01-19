import { createHash } from 'crypto';

export function generateHash(data: unknown): string {
  const json = JSON.stringify(data, Object.keys(data as object).sort());
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
