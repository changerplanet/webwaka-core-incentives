import { z } from 'zod';
export declare const IncentiveTypeSchema: z.ZodEnum<["flat", "percentage", "tiered", "multi_level", "lifetime"]>;
export type IncentiveType = z.infer<typeof IncentiveTypeSchema>;
export declare const IncentiveUnitSchema: z.ZodEnum<["currency", "points"]>;
export type IncentiveUnit = z.infer<typeof IncentiveUnitSchema>;
export declare const IncentiveStatusSchema: z.ZodEnum<["active", "inactive", "expired"]>;
export type IncentiveStatus = z.infer<typeof IncentiveStatusSchema>;
export declare const PrecedenceLevelSchema: z.ZodEnum<["individual", "campaign", "partner", "tenant", "system"]>;
export type PrecedenceLevel = z.infer<typeof PrecedenceLevelSchema>;
export declare const PRECEDENCE_ORDER: Record<PrecedenceLevel, number>;
//# sourceMappingURL=enums.d.ts.map