import { describe, it, expect } from 'vitest';
import { 
  IncentiveDefinitionSchema,
  IncentiveRuleSchema,
  IncentiveRelationshipSchema,
  IncentiveEvaluationContextSchema,
  IncentiveResultSchema,
  IncentiveSnapshotSchema,
  TierSchema,
  TransactionInfoSchema,
  IncentiveTraceSchema
} from '../src/models/types.js';
import {
  IncentiveTypeSchema,
  IncentiveUnitSchema,
  IncentiveStatusSchema,
  PrecedenceLevelSchema,
  PRECEDENCE_ORDER
} from '../src/models/enums.js';

describe('Schema Validation - Enums', () => {
  it('should validate incentive types', () => {
    expect(IncentiveTypeSchema.parse('flat')).toBe('flat');
    expect(IncentiveTypeSchema.parse('percentage')).toBe('percentage');
    expect(IncentiveTypeSchema.parse('tiered')).toBe('tiered');
    expect(IncentiveTypeSchema.parse('multi_level')).toBe('multi_level');
    expect(IncentiveTypeSchema.parse('lifetime')).toBe('lifetime');
    expect(() => IncentiveTypeSchema.parse('invalid')).toThrow();
  });

  it('should validate incentive units', () => {
    expect(IncentiveUnitSchema.parse('currency')).toBe('currency');
    expect(IncentiveUnitSchema.parse('points')).toBe('points');
    expect(() => IncentiveUnitSchema.parse('invalid')).toThrow();
  });

  it('should validate incentive status', () => {
    expect(IncentiveStatusSchema.parse('active')).toBe('active');
    expect(IncentiveStatusSchema.parse('inactive')).toBe('inactive');
    expect(IncentiveStatusSchema.parse('expired')).toBe('expired');
  });

  it('should validate precedence levels', () => {
    expect(PrecedenceLevelSchema.parse('individual')).toBe('individual');
    expect(PrecedenceLevelSchema.parse('campaign')).toBe('campaign');
    expect(PrecedenceLevelSchema.parse('partner')).toBe('partner');
    expect(PrecedenceLevelSchema.parse('tenant')).toBe('tenant');
    expect(PrecedenceLevelSchema.parse('system')).toBe('system');
  });

  it('should have correct precedence order', () => {
    expect(PRECEDENCE_ORDER.individual).toBeLessThan(PRECEDENCE_ORDER.campaign);
    expect(PRECEDENCE_ORDER.campaign).toBeLessThan(PRECEDENCE_ORDER.partner);
    expect(PRECEDENCE_ORDER.partner).toBeLessThan(PRECEDENCE_ORDER.tenant);
    expect(PRECEDENCE_ORDER.tenant).toBeLessThan(PRECEDENCE_ORDER.system);
  });
});

describe('Schema Validation - Types', () => {
  const NOW = '2025-01-01T00:00:00.000Z';
  const TENANT_ID = '00000000-0000-0000-0000-000000000001';
  const ID = '10000000-0000-0000-0000-000000000001';

  it('should validate Tier schema', () => {
    const tier = { minValue: 0, maxValue: 100, rate: 5 };
    expect(TierSchema.parse(tier)).toEqual(tier);
    
    const tierWithFlat = { minValue: 0, rate: 0, flatAmount: 50 };
    expect(TierSchema.parse(tierWithFlat)).toEqual(tierWithFlat);
  });

  it('should validate TransactionInfo schema', () => {
    const transaction = {
      id: ID,
      amount: 100,
      currency: 'USD'
    };
    expect(TransactionInfoSchema.parse(transaction)).toMatchObject(transaction);
  });

  it('should validate IncentiveDefinition schema', () => {
    const definition = {
      id: ID,
      tenantId: TENANT_ID,
      name: 'Test Incentive',
      type: 'flat',
      unit: 'currency',
      status: 'active',
      flatAmount: 50,
      isLifetime: false,
      createdAt: NOW,
      updatedAt: NOW
    };
    const parsed = IncentiveDefinitionSchema.parse(definition);
    expect(parsed.id).toBe(ID);
    expect(parsed.name).toBe('Test Incentive');
  });

  it('should validate IncentiveRule schema', () => {
    const rule = {
      id: ID,
      tenantId: TENANT_ID,
      incentiveId: ID,
      precedence: 'system',
      isActive: true,
      createdAt: NOW,
      updatedAt: NOW
    };
    const parsed = IncentiveRuleSchema.parse(rule);
    expect(parsed.precedence).toBe('system');
  });

  it('should validate IncentiveRelationship schema', () => {
    const relationship = {
      id: ID,
      tenantId: TENANT_ID,
      referrerId: '10000000-0000-0000-0000-000000000002',
      refereeId: '10000000-0000-0000-0000-000000000003',
      depth: 1,
      rootReferrerId: '10000000-0000-0000-0000-000000000002',
      chain: ['10000000-0000-0000-0000-000000000002'],
      isActive: true,
      createdAt: NOW
    };
    const parsed = IncentiveRelationshipSchema.parse(relationship);
    expect(parsed.depth).toBe(1);
  });

  it('should validate IncentiveEvaluationContext schema', () => {
    const context = {
      tenantId: TENANT_ID,
      subjectId: ID,
      eventType: 'purchase',
      eventId: ID,
      timestamp: NOW
    };
    const parsed = IncentiveEvaluationContextSchema.parse(context);
    expect(parsed.historicalTotal).toBe(0);
  });

  it('should validate IncentiveTrace schema', () => {
    const trace = {
      definitionId: ID,
      precedence: 'system',
      calculation: 'flat(50)',
      inputValue: 100,
      outputValue: 50
    };
    const parsed = IncentiveTraceSchema.parse(trace);
    expect(parsed.calculation).toBe('flat(50)');
  });

  it('should validate IncentiveResult schema', () => {
    const result = {
      id: ID,
      tenantId: TENANT_ID,
      subjectId: ID,
      amount: 50,
      unit: 'currency',
      incentiveId: ID,
      depth: 0,
      trace: {
        definitionId: ID,
        precedence: 'system',
        calculation: 'flat(50)',
        inputValue: 100,
        outputValue: 50
      },
      idempotencyKey: 'abc123',
      eventId: ID,
      isLifetime: false,
      evaluatedAt: NOW
    };
    const parsed = IncentiveResultSchema.parse(result);
    expect(parsed.amount).toBe(50);
  });

  it('should validate IncentiveSnapshot schema', () => {
    const snapshot = {
      id: ID,
      tenantId: TENANT_ID,
      version: '1.0.0',
      definitions: [],
      rules: [],
      relationships: [],
      hash: 'abcdef123456',
      createdAt: NOW
    };
    const parsed = IncentiveSnapshotSchema.parse(snapshot);
    expect(parsed.version).toBe('1.0.0');
  });

  it('should reject invalid UUIDs', () => {
    expect(() => IncentiveDefinitionSchema.parse({
      id: 'not-a-uuid',
      tenantId: TENANT_ID,
      name: 'Test',
      type: 'flat',
      unit: 'currency',
      status: 'active',
      createdAt: NOW,
      updatedAt: NOW
    })).toThrow();
  });

  it('should reject negative amounts', () => {
    expect(() => TierSchema.parse({
      minValue: -1,
      rate: 5
    })).toThrow();
  });
});
