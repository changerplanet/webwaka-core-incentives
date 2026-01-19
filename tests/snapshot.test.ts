import { describe, it, expect } from 'vitest';
import { evaluateIncentives } from '../src/engine/evaluator.js';
import { 
  generateIncentiveSnapshot, 
  evaluateFromSnapshot, 
  verifySnapshotIntegrity 
} from '../src/snapshots/snapshot.js';
import { 
  createFlatDefinition, 
  createPercentageDefinition,
  createTieredDefinition,
  createContext,
  TENANT_ID 
} from './fixtures.js';

describe('Snapshot Parity (Live vs Snapshot)', () => {
  it('should produce identical results from live and snapshot evaluation', () => {
    const definitions = [createFlatDefinition(), createPercentageDefinition()];
    const context = createContext();

    const liveResults = evaluateIncentives(definitions, [], [], context);

    const snapshot = generateIncentiveSnapshot({
      tenantId: TENANT_ID,
      definitions,
      rules: [],
      relationships: []
    });

    const snapshotResults = evaluateFromSnapshot(snapshot, context);

    expect(snapshotResults.length).toBe(liveResults.length);
    
    for (let i = 0; i < liveResults.length; i++) {
      expect(snapshotResults[i].amount).toBe(liveResults[i].amount);
      expect(snapshotResults[i].incentiveId).toBe(liveResults[i].incentiveId);
      expect(snapshotResults[i].idempotencyKey).toBe(liveResults[i].idempotencyKey);
    }
  });

  it('should produce same amounts with tiered definitions', () => {
    const definitions = [createTieredDefinition()];
    const context = createContext();

    const liveResults = evaluateIncentives(definitions, [], [], context);

    const snapshot = generateIncentiveSnapshot({
      tenantId: TENANT_ID,
      definitions,
      rules: [],
      relationships: []
    });

    const snapshotResults = evaluateFromSnapshot(snapshot, context);

    expect(snapshotResults[0].amount).toBe(liveResults[0].amount);
  });
});

describe('Tampering Detection', () => {
  it('should detect tampering when definition is modified', () => {
    const definitions = [createFlatDefinition()];

    const snapshot = generateIncentiveSnapshot({
      tenantId: TENANT_ID,
      definitions,
      rules: [],
      relationships: []
    });

    const tamperedSnapshot = {
      ...snapshot,
      definitions: snapshot.definitions.map(d => ({
        ...d,
        flatAmount: 9999
      }))
    };

    const verification = verifySnapshotIntegrity(tamperedSnapshot);

    expect(verification.isValid).toBe(false);
    expect(verification.expectedHash).not.toBe(verification.actualHash);
  });

  it('should detect tampering when rule is added', () => {
    const definitions = [createFlatDefinition()];

    const snapshot = generateIncentiveSnapshot({
      tenantId: TENANT_ID,
      definitions,
      rules: [],
      relationships: []
    });

    const tamperedSnapshot = {
      ...snapshot,
      rules: [{
        id: '99999999-0000-0000-0000-000000000001',
        tenantId: TENANT_ID,
        incentiveId: definitions[0].id,
        precedence: 'system' as const,
        isActive: true,
        createdAt: '2025-01-01T00:00:00.000Z',
        updatedAt: '2025-01-01T00:00:00.000Z'
      }]
    };

    const verification = verifySnapshotIntegrity(tamperedSnapshot);

    expect(verification.isValid).toBe(false);
  });

  it('should validate intact snapshot', () => {
    const definitions = [createFlatDefinition(), createPercentageDefinition()];

    const snapshot = generateIncentiveSnapshot({
      tenantId: TENANT_ID,
      definitions,
      rules: [],
      relationships: []
    });

    const verification = verifySnapshotIntegrity(snapshot);

    expect(verification.isValid).toBe(true);
    expect(verification.expectedHash).toBe(verification.actualHash);
  });
});
