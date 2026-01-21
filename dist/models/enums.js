import { z } from 'zod';
export const IncentiveTypeSchema = z.enum([
    'flat',
    'percentage',
    'tiered',
    'multi_level',
    'lifetime'
]);
export const IncentiveUnitSchema = z.enum(['currency', 'points']);
export const IncentiveStatusSchema = z.enum(['active', 'inactive', 'expired']);
export const PrecedenceLevelSchema = z.enum([
    'individual',
    'campaign',
    'partner',
    'tenant',
    'system'
]);
export const PRECEDENCE_ORDER = {
    individual: 1,
    campaign: 2,
    partner: 3,
    tenant: 4,
    system: 5
};
