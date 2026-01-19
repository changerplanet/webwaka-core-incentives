import { z } from 'zod';

export const IncentiveTypeSchema = z.enum([
  'flat',
  'percentage', 
  'tiered',
  'multi_level',
  'lifetime'
]);
export type IncentiveType = z.infer<typeof IncentiveTypeSchema>;

export const IncentiveUnitSchema = z.enum(['currency', 'points']);
export type IncentiveUnit = z.infer<typeof IncentiveUnitSchema>;

export const IncentiveStatusSchema = z.enum(['active', 'inactive', 'expired']);
export type IncentiveStatus = z.infer<typeof IncentiveStatusSchema>;

export const PrecedenceLevelSchema = z.enum([
  'individual',
  'campaign',
  'partner',
  'tenant',
  'system'
]);
export type PrecedenceLevel = z.infer<typeof PrecedenceLevelSchema>;

export const PRECEDENCE_ORDER: Record<PrecedenceLevel, number> = {
  individual: 1,
  campaign: 2,
  partner: 3,
  tenant: 4,
  system: 5
};
