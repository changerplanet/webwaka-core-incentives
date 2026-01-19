import { describe, it, expect } from 'vitest';
import { evaluateIncentives } from '../src/engine/evaluator.js';
import { 
  createFlatDefinition, 
  createPercentageDefinition,
  createTieredDefinition,
  createMultiLevelDefinition,
  createLifetimeDefinition,
  createMultiLevelRelationships,
  createContext 
} from './fixtures.js';

describe('Flat Commission', () => {
  it('should calculate flat commission correctly', () => {
    const definitions = [createFlatDefinition()];
    const context = createContext();

    const results = evaluateIncentives(definitions, [], [], context);

    expect(results).toHaveLength(1);
    expect(results[0].amount).toBe(50);
    expect(results[0].unit).toBe('currency');
    expect(results[0].trace.calculation).toContain('flat');
  });

  it('should return flat amount regardless of transaction value', () => {
    const definitions = [createFlatDefinition()];
    const context1 = createContext({ 
      transaction: { id: '70000000-0000-0000-0000-000000000001', amount: 100, currency: 'USD' } 
    });
    const context2 = createContext({ 
      transaction: { id: '70000000-0000-0000-0000-000000000001', amount: 10000, currency: 'USD' } 
    });

    const results1 = evaluateIncentives(definitions, [], [], context1);
    const results2 = evaluateIncentives(definitions, [], [], context2);

    expect(results1[0].amount).toBe(results2[0].amount);
    expect(results1[0].amount).toBe(50);
  });
});

describe('Percentage Commission', () => {
  it('should calculate percentage commission correctly', () => {
    const definitions = [createPercentageDefinition()];
    const context = createContext({ 
      transaction: { id: '70000000-0000-0000-0000-000000000001', amount: 200, currency: 'USD' } 
    });

    const results = evaluateIncentives(definitions, [], [], context);

    expect(results).toHaveLength(1);
    expect(results[0].amount).toBe(20);
    expect(results[0].trace.calculation).toContain('percentage');
  });

  it('should scale with transaction amount', () => {
    const definitions = [createPercentageDefinition()];
    const context = createContext({ 
      transaction: { id: '70000000-0000-0000-0000-000000000001', amount: 500, currency: 'USD' } 
    });

    const results = evaluateIncentives(definitions, [], [], context);

    expect(results[0].amount).toBe(50);
  });
});

describe('Tiered Commission', () => {
  it('should apply tier 1 for small transactions', () => {
    const definitions = [createTieredDefinition()];
    const context = createContext({ 
      transaction: { id: '70000000-0000-0000-0000-000000000001', amount: 50, currency: 'USD' } 
    });

    const results = evaluateIncentives(definitions, [], [], context);

    expect(results).toHaveLength(1);
    expect(results[0].amount).toBe(2.5);
  });

  it('should apply tier 2 for medium transactions', () => {
    const definitions = [createTieredDefinition()];
    const context = createContext({ 
      transaction: { id: '70000000-0000-0000-0000-000000000001', amount: 200, currency: 'USD' } 
    });

    const results = evaluateIncentives(definitions, [], [], context);

    expect(results[0].amount).toBe(15);
  });

  it('should apply tier 3 for large transactions', () => {
    const definitions = [createTieredDefinition()];
    const context = createContext({ 
      transaction: { id: '70000000-0000-0000-0000-000000000001', amount: 1000, currency: 'USD' } 
    });

    const results = evaluateIncentives(definitions, [], [], context);

    expect(results[0].amount).toBe(100);
  });
});

describe('Multi-Level Incentive (Depth 3)', () => {
  it('should calculate incentives for all 3 levels in referral chain', () => {
    const definitions = [createMultiLevelDefinition()];
    const relationships = createMultiLevelRelationships();
    const context = createContext({ 
      transaction: { id: '70000000-0000-0000-0000-000000000001', amount: 100, currency: 'USD' } 
    });

    const results = evaluateIncentives(definitions, [], relationships, context);

    expect(results).toHaveLength(3);
    
    const level1 = results.find(r => r.depth === 1);
    const level2 = results.find(r => r.depth === 2);
    const level3 = results.find(r => r.depth === 3);

    expect(level1?.amount).toBe(10);
    expect(level2?.amount).toBe(5);
    expect(level3?.amount).toBe(2.5);
  });

  it('should assign correct subjects at each depth', () => {
    const definitions = [createMultiLevelDefinition()];
    const relationships = createMultiLevelRelationships();
    const context = createContext();

    const results = evaluateIncentives(definitions, [], relationships, context);

    expect(results[0].subjectId).toBe('30000000-0000-0000-0000-000000000010');
    expect(results[1].subjectId).toBe('30000000-0000-0000-0000-000000000011');
    expect(results[2].subjectId).toBe('30000000-0000-0000-0000-000000000012');
  });

  it('should generate unique idempotency keys for each level', () => {
    const definitions = [createMultiLevelDefinition()];
    const relationships = createMultiLevelRelationships();
    const context = createContext();

    const results = evaluateIncentives(definitions, [], relationships, context);
    const keys = results.map(r => r.idempotencyKey);

    expect(new Set(keys).size).toBe(3);
  });
});

describe('Lifetime Incentive', () => {
  it('should consider historical total in tier calculation', () => {
    const definitions = [createLifetimeDefinition()];
    const context = createContext({ 
      historicalTotal: 900,
      transaction: { id: '70000000-0000-0000-0000-000000000001', amount: 200, currency: 'USD' }
    });

    const results = evaluateIncentives(definitions, [], [], context);

    expect(results).toHaveLength(1);
    expect(results[0].amount).toBe(22);
    expect(results[0].isLifetime).toBe(true);
  });
});
