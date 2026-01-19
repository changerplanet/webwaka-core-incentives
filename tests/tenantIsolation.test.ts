import { describe, it, expect } from 'vitest';
import { evaluateIncentives } from '../src/engine/evaluator.js';
import { generateIncentiveSnapshot, evaluateFromSnapshot } from '../src/snapshots/snapshot.js';
import { TenantIsolationError } from '../src/utils/validation.js';
import { 
  createFlatDefinition, 
  createOtherTenantDefinition,
  createContext,
  TENANT_ID,
  OTHER_TENANT_ID 
} from './fixtures.js';

describe('Tenant Isolation Failure Cases', () => {
  it('should throw TenantIsolationError when definition belongs to different tenant', () => {
    const definitions = [createOtherTenantDefinition()];
    const context = createContext();

    expect(() => {
      evaluateIncentives(definitions, [], [], context);
    }).toThrow(TenantIsolationError);
  });

  it('should throw TenantIsolationError when rule belongs to different tenant', () => {
    const definitions = [createFlatDefinition()];
    const rules = [{
      id: '20000000-0000-0000-0000-000000000099',
      tenantId: OTHER_TENANT_ID,
      incentiveId: definitions[0].id,
      precedence: 'system' as const,
      isActive: true,
      createdAt: '2025-01-01T00:00:00.000Z',
      updatedAt: '2025-01-01T00:00:00.000Z'
    }];
    const context = createContext();

    expect(() => {
      evaluateIncentives(definitions, rules, [], context);
    }).toThrow(TenantIsolationError);
  });

  it('should throw TenantIsolationError when relationship belongs to different tenant', () => {
    const definitions = [createFlatDefinition()];
    const relationships = [{
      id: '50000000-0000-0000-0000-000000000099',
      tenantId: OTHER_TENANT_ID,
      referrerId: '30000000-0000-0000-0000-000000000002',
      refereeId: '30000000-0000-0000-0000-000000000001',
      depth: 1,
      rootReferrerId: '30000000-0000-0000-0000-000000000002',
      chain: ['30000000-0000-0000-0000-000000000002'],
      isActive: true,
      createdAt: '2025-01-01T00:00:00.000Z'
    }];
    const context = createContext();

    expect(() => {
      evaluateIncentives(definitions, [], relationships, context);
    }).toThrow(TenantIsolationError);
  });

  it('should throw when evaluating snapshot with mismatched tenant', () => {
    const definitions = [createFlatDefinition()];

    const snapshot = generateIncentiveSnapshot({
      tenantId: TENANT_ID,
      definitions,
      rules: [],
      relationships: []
    });

    const otherTenantContext = createContext({ tenantId: OTHER_TENANT_ID });

    expect(() => {
      evaluateFromSnapshot(snapshot, otherTenantContext);
    }).toThrow(TenantIsolationError);
  });

  it('should only include tenant-specific data in snapshot', () => {
    const ownDefinitions = [createFlatDefinition()];
    const otherDefinitions = [createOtherTenantDefinition()];
    const allDefinitions = [...ownDefinitions, ...otherDefinitions];

    expect(() => {
      generateIncentiveSnapshot({
        tenantId: TENANT_ID,
        definitions: allDefinitions,
        rules: [],
        relationships: []
      });
    }).toThrow(TenantIsolationError);
  });
});

describe('Cross-Tenant Query Prevention', () => {
  it('should not allow mixed tenant definitions in single evaluation', () => {
    const ownDefinition = createFlatDefinition();
    const otherDefinition = createOtherTenantDefinition();
    const context = createContext();

    expect(() => {
      evaluateIncentives([ownDefinition, otherDefinition], [], [], context);
    }).toThrow(TenantIsolationError);
  });

  it('should require tenantId on every input object', () => {
    const definitions = [createFlatDefinition()];
    const context = createContext();

    const results = evaluateIncentives(definitions, [], [], context);

    results.forEach(result => {
      expect(result.tenantId).toBe(TENANT_ID);
    });
  });
});
