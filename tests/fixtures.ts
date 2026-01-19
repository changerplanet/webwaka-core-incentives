import type { 
  IncentiveDefinition, 
  IncentiveRule, 
  IncentiveRelationship,
  IncentiveEvaluationContext 
} from '../src/models/types.js';

const TENANT_ID = '00000000-0000-0000-0000-000000000001';
const OTHER_TENANT_ID = '00000000-0000-0000-0000-000000000002';
const NOW = '2025-01-01T00:00:00.000Z';

export function createFlatDefinition(): IncentiveDefinition {
  return {
    id: '10000000-0000-0000-0000-000000000001',
    tenantId: TENANT_ID,
    name: 'Flat Referral Bonus',
    type: 'flat',
    unit: 'currency',
    status: 'active',
    flatAmount: 50,
    isLifetime: false,
    createdAt: NOW,
    updatedAt: NOW
  };
}

export function createPercentageDefinition(): IncentiveDefinition {
  return {
    id: '10000000-0000-0000-0000-000000000002',
    tenantId: TENANT_ID,
    name: 'Percentage Commission',
    type: 'percentage',
    unit: 'currency',
    status: 'active',
    percentage: 10,
    isLifetime: false,
    createdAt: NOW,
    updatedAt: NOW
  };
}

export function createTieredDefinition(): IncentiveDefinition {
  return {
    id: '10000000-0000-0000-0000-000000000003',
    tenantId: TENANT_ID,
    name: 'Tiered Commission',
    type: 'tiered',
    unit: 'currency',
    status: 'active',
    tiers: [
      { minValue: 0, maxValue: 100, rate: 5 },
      { minValue: 101, maxValue: 500, rate: 7.5 },
      { minValue: 501, rate: 10 }
    ],
    isLifetime: false,
    createdAt: NOW,
    updatedAt: NOW
  };
}

export function createMultiLevelDefinition(): IncentiveDefinition {
  return {
    id: '10000000-0000-0000-0000-000000000004',
    tenantId: TENANT_ID,
    name: 'Multi-Level Commission',
    type: 'multi_level',
    unit: 'currency',
    status: 'active',
    maxDepth: 3,
    depthRates: [10, 5, 2.5],
    isLifetime: false,
    createdAt: NOW,
    updatedAt: NOW
  };
}

export function createLifetimeDefinition(): IncentiveDefinition {
  return {
    id: '10000000-0000-0000-0000-000000000005',
    tenantId: TENANT_ID,
    name: 'Lifetime Value Bonus',
    type: 'lifetime',
    unit: 'points',
    status: 'active',
    tiers: [
      { minValue: 0, maxValue: 1000, rate: 1 },
      { minValue: 1001, maxValue: 5000, rate: 2 },
      { minValue: 5001, rate: 3 }
    ],
    isLifetime: true,
    createdAt: NOW,
    updatedAt: NOW
  };
}

export function createIndividualOverrideRule(incentiveId: string): IncentiveRule {
  return {
    id: '20000000-0000-0000-0000-000000000001',
    tenantId: TENANT_ID,
    incentiveId,
    precedence: 'individual',
    targetId: '30000000-0000-0000-0000-000000000001',
    overrideAmount: 100,
    isActive: true,
    createdAt: NOW,
    updatedAt: NOW
  };
}

export function createCampaignRule(incentiveId: string): IncentiveRule {
  return {
    id: '20000000-0000-0000-0000-000000000002',
    tenantId: TENANT_ID,
    incentiveId,
    precedence: 'campaign',
    campaignId: '40000000-0000-0000-0000-000000000001',
    overrideAmount: 75,
    isActive: true,
    createdAt: NOW,
    updatedAt: NOW
  };
}

export function createTenantRule(incentiveId: string): IncentiveRule {
  return {
    id: '20000000-0000-0000-0000-000000000003',
    tenantId: TENANT_ID,
    incentiveId,
    precedence: 'tenant',
    overrideAmount: 60,
    isActive: true,
    createdAt: NOW,
    updatedAt: NOW
  };
}

export function createMultiLevelRelationships(): IncentiveRelationship[] {
  const level1ReferrerId = '30000000-0000-0000-0000-000000000010';
  const level2ReferrerId = '30000000-0000-0000-0000-000000000011';
  const level3ReferrerId = '30000000-0000-0000-0000-000000000012';
  const subjectId = '30000000-0000-0000-0000-000000000001';

  return [
    {
      id: '50000000-0000-0000-0000-000000000001',
      tenantId: TENANT_ID,
      referrerId: level1ReferrerId,
      refereeId: subjectId,
      depth: 1,
      rootReferrerId: level3ReferrerId,
      chain: [level3ReferrerId, level2ReferrerId, level1ReferrerId],
      isActive: true,
      createdAt: NOW
    },
    {
      id: '50000000-0000-0000-0000-000000000002',
      tenantId: TENANT_ID,
      referrerId: level2ReferrerId,
      refereeId: level1ReferrerId,
      depth: 2,
      rootReferrerId: level3ReferrerId,
      chain: [level3ReferrerId, level2ReferrerId],
      isActive: true,
      createdAt: NOW
    },
    {
      id: '50000000-0000-0000-0000-000000000003',
      tenantId: TENANT_ID,
      referrerId: level3ReferrerId,
      refereeId: level2ReferrerId,
      depth: 3,
      rootReferrerId: level3ReferrerId,
      chain: [level3ReferrerId],
      isActive: true,
      createdAt: NOW
    }
  ];
}

export function createContext(overrides?: Partial<IncentiveEvaluationContext>): IncentiveEvaluationContext {
  return {
    tenantId: TENANT_ID,
    subjectId: '30000000-0000-0000-0000-000000000001',
    eventType: 'purchase',
    eventId: '60000000-0000-0000-0000-000000000001',
    transaction: {
      id: '70000000-0000-0000-0000-000000000001',
      amount: 200,
      currency: 'USD'
    },
    timestamp: NOW,
    historicalTotal: 0,
    ...overrides
  };
}

export function createOtherTenantDefinition(): IncentiveDefinition {
  return {
    id: '10000000-0000-0000-0000-000000000099',
    tenantId: OTHER_TENANT_ID,
    name: 'Other Tenant Incentive',
    type: 'flat',
    unit: 'currency',
    status: 'active',
    flatAmount: 100,
    isLifetime: false,
    createdAt: NOW,
    updatedAt: NOW
  };
}

export { TENANT_ID, OTHER_TENANT_ID, NOW };
