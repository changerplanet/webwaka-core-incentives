import { z } from 'zod';
import { 
  IncentiveTypeSchema, 
  IncentiveUnitSchema, 
  IncentiveStatusSchema,
  PrecedenceLevelSchema 
} from './enums.js';

export const TierSchema = z.object({
  minValue: z.number().nonnegative(),
  maxValue: z.number().nonnegative().optional(),
  rate: z.number().nonnegative(),
  flatAmount: z.number().nonnegative().optional()
});
export type Tier = z.infer<typeof TierSchema>;

export const IncentiveDefinitionSchema = z.object({
  id: z.string().uuid(),
  tenantId: z.string().uuid(),
  name: z.string().min(1),
  description: z.string().optional(),
  type: IncentiveTypeSchema,
  unit: IncentiveUnitSchema,
  status: IncentiveStatusSchema,
  flatAmount: z.number().nonnegative().optional(),
  percentage: z.number().min(0).max(100).optional(),
  tiers: z.array(TierSchema).optional(),
  maxDepth: z.number().int().min(1).max(10).optional(),
  depthRates: z.array(z.number().min(0).max(100)).optional(),
  isLifetime: z.boolean().default(false),
  validFrom: z.string().datetime().optional(),
  validUntil: z.string().datetime().optional(),
  metadata: z.record(z.unknown()).optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});
export type IncentiveDefinition = z.infer<typeof IncentiveDefinitionSchema>;

export const IncentiveRuleSchema = z.object({
  id: z.string().uuid(),
  tenantId: z.string().uuid(),
  incentiveId: z.string().uuid(),
  precedence: PrecedenceLevelSchema,
  targetId: z.string().uuid().optional(),
  campaignId: z.string().uuid().optional(),
  overrideAmount: z.number().nonnegative().optional(),
  overridePercentage: z.number().min(0).max(100).optional(),
  overrideTiers: z.array(TierSchema).optional(),
  isActive: z.boolean().default(true),
  validFrom: z.string().datetime().optional(),
  validUntil: z.string().datetime().optional(),
  metadata: z.record(z.unknown()).optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});
export type IncentiveRule = z.infer<typeof IncentiveRuleSchema>;

export const IncentiveRelationshipSchema = z.object({
  id: z.string().uuid(),
  tenantId: z.string().uuid(),
  referrerId: z.string().uuid(),
  refereeId: z.string().uuid(),
  depth: z.number().int().min(1).max(10),
  rootReferrerId: z.string().uuid(),
  chain: z.array(z.string().uuid()),
  isActive: z.boolean().default(true),
  createdAt: z.string().datetime()
});
export type IncentiveRelationship = z.infer<typeof IncentiveRelationshipSchema>;

export const TransactionInfoSchema = z.object({
  id: z.string().uuid(),
  amount: z.number().nonnegative(),
  currency: z.string().length(3),
  productId: z.string().uuid().optional(),
  categoryId: z.string().uuid().optional(),
  metadata: z.record(z.unknown()).optional()
});
export type TransactionInfo = z.infer<typeof TransactionInfoSchema>;

export const IncentiveEvaluationContextSchema = z.object({
  tenantId: z.string().uuid(),
  subjectId: z.string().uuid(),
  eventType: z.string().min(1),
  eventId: z.string().uuid(),
  transaction: TransactionInfoSchema.optional(),
  timestamp: z.string().datetime(),
  historicalTotal: z.number().nonnegative().default(0),
  metadata: z.record(z.unknown()).optional()
});
export type IncentiveEvaluationContext = z.infer<typeof IncentiveEvaluationContextSchema>;

export const IncentiveTraceSchema = z.object({
  definitionId: z.string().uuid(),
  ruleId: z.string().uuid().optional(),
  precedence: PrecedenceLevelSchema,
  calculation: z.string(),
  inputValue: z.number(),
  outputValue: z.number()
});
export type IncentiveTrace = z.infer<typeof IncentiveTraceSchema>;

export const IncentiveResultSchema = z.object({
  id: z.string().uuid(),
  tenantId: z.string().uuid(),
  subjectId: z.string().uuid(),
  amount: z.number(),
  unit: IncentiveUnitSchema,
  incentiveId: z.string().uuid(),
  depth: z.number().int().min(0),
  trace: IncentiveTraceSchema,
  idempotencyKey: z.string(),
  eventId: z.string().uuid(),
  isLifetime: z.boolean().default(false),
  evaluatedAt: z.string().datetime()
});
export type IncentiveResult = z.infer<typeof IncentiveResultSchema>;

export const IncentiveSnapshotSchema = z.object({
  id: z.string().uuid(),
  tenantId: z.string().uuid(),
  version: z.string(),
  definitions: z.array(IncentiveDefinitionSchema),
  rules: z.array(IncentiveRuleSchema),
  relationships: z.array(IncentiveRelationshipSchema),
  hash: z.string(),
  createdAt: z.string().datetime()
});
export type IncentiveSnapshot = z.infer<typeof IncentiveSnapshotSchema>;
