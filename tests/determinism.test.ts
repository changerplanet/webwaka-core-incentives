import { describe, it, expect } from 'vitest';
import { evaluateIncentives } from '../src/engine/evaluator.js';
import { 
  createFlatDefinition, 
  createPercentageDefinition,
  createTieredDefinition,
  createMultiLevelDefinition,
  createMultiLevelRelationships,
  createContext 
} from './fixtures.js';

describe('Determinism Tests (Hard Stop Condition)', () => {
  it('should produce identical results when evaluated 10 times with same flat incentive input', () => {
    const definitions = [createFlatDefinition()];
    const rules: never[] = [];
    const relationships: never[] = [];
    const context = createContext();

    const results: string[] = [];
    for (let i = 0; i < 10; i++) {
      const result = evaluateIncentives(definitions, rules, relationships, context);
      results.push(JSON.stringify(result.map(r => ({
        amount: r.amount,
        incentiveId: r.incentiveId,
        subjectId: r.subjectId,
        depth: r.depth,
        idempotencyKey: r.idempotencyKey
      }))));
    }

    const firstResult = results[0];
    for (let i = 1; i < 10; i++) {
      expect(results[i]).toBe(firstResult);
    }
  });

  it('should produce identical results when evaluated 10 times with percentage incentive', () => {
    const definitions = [createPercentageDefinition()];
    const context = createContext();

    const results: string[] = [];
    for (let i = 0; i < 10; i++) {
      const result = evaluateIncentives(definitions, [], [], context);
      results.push(JSON.stringify(result.map(r => ({
        amount: r.amount,
        incentiveId: r.incentiveId,
        idempotencyKey: r.idempotencyKey
      }))));
    }

    expect(new Set(results).size).toBe(1);
  });

  it('should produce identical results when evaluated 10 times with tiered incentive', () => {
    const definitions = [createTieredDefinition()];
    const context = createContext();

    const results: string[] = [];
    for (let i = 0; i < 10; i++) {
      const result = evaluateIncentives(definitions, [], [], context);
      results.push(JSON.stringify(result.map(r => ({
        amount: r.amount,
        incentiveId: r.incentiveId
      }))));
    }

    expect(new Set(results).size).toBe(1);
  });

  it('should produce identical results when evaluated 10 times with multi-level incentive', () => {
    const definitions = [createMultiLevelDefinition()];
    const relationships = createMultiLevelRelationships();
    const context = createContext();

    const results: string[] = [];
    for (let i = 0; i < 10; i++) {
      const result = evaluateIncentives(definitions, [], relationships, context);
      results.push(JSON.stringify(result.map(r => ({
        amount: r.amount,
        subjectId: r.subjectId,
        depth: r.depth,
        idempotencyKey: r.idempotencyKey
      }))));
    }

    expect(new Set(results).size).toBe(1);
  });

  it('should produce identical idempotency keys across evaluations', () => {
    const definitions = [createFlatDefinition(), createPercentageDefinition()];
    const context = createContext();

    const allIdempotencyKeys: string[][] = [];
    for (let i = 0; i < 10; i++) {
      const result = evaluateIncentives(definitions, [], [], context);
      allIdempotencyKeys.push(result.map(r => r.idempotencyKey).sort());
    }

    const firstKeys = JSON.stringify(allIdempotencyKeys[0]);
    for (let i = 1; i < 10; i++) {
      expect(JSON.stringify(allIdempotencyKeys[i])).toBe(firstKeys);
    }
  });
});
