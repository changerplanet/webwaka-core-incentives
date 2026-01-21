import { z } from 'zod';
export declare const TierSchema: z.ZodObject<{
    minValue: z.ZodNumber;
    maxValue: z.ZodOptional<z.ZodNumber>;
    rate: z.ZodNumber;
    flatAmount: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    minValue: number;
    rate: number;
    maxValue?: number | undefined;
    flatAmount?: number | undefined;
}, {
    minValue: number;
    rate: number;
    maxValue?: number | undefined;
    flatAmount?: number | undefined;
}>;
export type Tier = z.infer<typeof TierSchema>;
export declare const IncentiveDefinitionSchema: z.ZodObject<{
    id: z.ZodString;
    tenantId: z.ZodString;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    type: z.ZodEnum<["flat", "percentage", "tiered", "multi_level", "lifetime"]>;
    unit: z.ZodEnum<["currency", "points"]>;
    status: z.ZodEnum<["active", "inactive", "expired"]>;
    flatAmount: z.ZodOptional<z.ZodNumber>;
    percentage: z.ZodOptional<z.ZodNumber>;
    tiers: z.ZodOptional<z.ZodArray<z.ZodObject<{
        minValue: z.ZodNumber;
        maxValue: z.ZodOptional<z.ZodNumber>;
        rate: z.ZodNumber;
        flatAmount: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        minValue: number;
        rate: number;
        maxValue?: number | undefined;
        flatAmount?: number | undefined;
    }, {
        minValue: number;
        rate: number;
        maxValue?: number | undefined;
        flatAmount?: number | undefined;
    }>, "many">>;
    maxDepth: z.ZodOptional<z.ZodNumber>;
    depthRates: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
    isLifetime: z.ZodDefault<z.ZodBoolean>;
    validFrom: z.ZodOptional<z.ZodString>;
    validUntil: z.ZodOptional<z.ZodString>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "flat" | "percentage" | "tiered" | "multi_level" | "lifetime";
    status: "active" | "inactive" | "expired";
    id: string;
    tenantId: string;
    name: string;
    unit: "currency" | "points";
    isLifetime: boolean;
    createdAt: string;
    updatedAt: string;
    percentage?: number | undefined;
    flatAmount?: number | undefined;
    description?: string | undefined;
    tiers?: {
        minValue: number;
        rate: number;
        maxValue?: number | undefined;
        flatAmount?: number | undefined;
    }[] | undefined;
    maxDepth?: number | undefined;
    depthRates?: number[] | undefined;
    validFrom?: string | undefined;
    validUntil?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
}, {
    type: "flat" | "percentage" | "tiered" | "multi_level" | "lifetime";
    status: "active" | "inactive" | "expired";
    id: string;
    tenantId: string;
    name: string;
    unit: "currency" | "points";
    createdAt: string;
    updatedAt: string;
    percentage?: number | undefined;
    flatAmount?: number | undefined;
    description?: string | undefined;
    tiers?: {
        minValue: number;
        rate: number;
        maxValue?: number | undefined;
        flatAmount?: number | undefined;
    }[] | undefined;
    maxDepth?: number | undefined;
    depthRates?: number[] | undefined;
    isLifetime?: boolean | undefined;
    validFrom?: string | undefined;
    validUntil?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
}>;
export type IncentiveDefinition = z.infer<typeof IncentiveDefinitionSchema>;
export declare const IncentiveRuleSchema: z.ZodObject<{
    id: z.ZodString;
    tenantId: z.ZodString;
    incentiveId: z.ZodString;
    precedence: z.ZodEnum<["individual", "campaign", "partner", "tenant", "system"]>;
    targetId: z.ZodOptional<z.ZodString>;
    campaignId: z.ZodOptional<z.ZodString>;
    overrideAmount: z.ZodOptional<z.ZodNumber>;
    overridePercentage: z.ZodOptional<z.ZodNumber>;
    overrideTiers: z.ZodOptional<z.ZodArray<z.ZodObject<{
        minValue: z.ZodNumber;
        maxValue: z.ZodOptional<z.ZodNumber>;
        rate: z.ZodNumber;
        flatAmount: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        minValue: number;
        rate: number;
        maxValue?: number | undefined;
        flatAmount?: number | undefined;
    }, {
        minValue: number;
        rate: number;
        maxValue?: number | undefined;
        flatAmount?: number | undefined;
    }>, "many">>;
    isActive: z.ZodDefault<z.ZodBoolean>;
    validFrom: z.ZodOptional<z.ZodString>;
    validUntil: z.ZodOptional<z.ZodString>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    tenantId: string;
    createdAt: string;
    updatedAt: string;
    incentiveId: string;
    precedence: "individual" | "campaign" | "partner" | "tenant" | "system";
    isActive: boolean;
    validFrom?: string | undefined;
    validUntil?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
    targetId?: string | undefined;
    campaignId?: string | undefined;
    overrideAmount?: number | undefined;
    overridePercentage?: number | undefined;
    overrideTiers?: {
        minValue: number;
        rate: number;
        maxValue?: number | undefined;
        flatAmount?: number | undefined;
    }[] | undefined;
}, {
    id: string;
    tenantId: string;
    createdAt: string;
    updatedAt: string;
    incentiveId: string;
    precedence: "individual" | "campaign" | "partner" | "tenant" | "system";
    validFrom?: string | undefined;
    validUntil?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
    targetId?: string | undefined;
    campaignId?: string | undefined;
    overrideAmount?: number | undefined;
    overridePercentage?: number | undefined;
    overrideTiers?: {
        minValue: number;
        rate: number;
        maxValue?: number | undefined;
        flatAmount?: number | undefined;
    }[] | undefined;
    isActive?: boolean | undefined;
}>;
export type IncentiveRule = z.infer<typeof IncentiveRuleSchema>;
export declare const IncentiveRelationshipSchema: z.ZodObject<{
    id: z.ZodString;
    tenantId: z.ZodString;
    referrerId: z.ZodString;
    refereeId: z.ZodString;
    depth: z.ZodNumber;
    rootReferrerId: z.ZodString;
    chain: z.ZodArray<z.ZodString, "many">;
    isActive: z.ZodDefault<z.ZodBoolean>;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    tenantId: string;
    createdAt: string;
    isActive: boolean;
    referrerId: string;
    refereeId: string;
    depth: number;
    rootReferrerId: string;
    chain: string[];
}, {
    id: string;
    tenantId: string;
    createdAt: string;
    referrerId: string;
    refereeId: string;
    depth: number;
    rootReferrerId: string;
    chain: string[];
    isActive?: boolean | undefined;
}>;
export type IncentiveRelationship = z.infer<typeof IncentiveRelationshipSchema>;
export declare const TransactionInfoSchema: z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    currency: z.ZodString;
    productId: z.ZodOptional<z.ZodString>;
    categoryId: z.ZodOptional<z.ZodString>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    currency: string;
    id: string;
    amount: number;
    metadata?: Record<string, unknown> | undefined;
    productId?: string | undefined;
    categoryId?: string | undefined;
}, {
    currency: string;
    id: string;
    amount: number;
    metadata?: Record<string, unknown> | undefined;
    productId?: string | undefined;
    categoryId?: string | undefined;
}>;
export type TransactionInfo = z.infer<typeof TransactionInfoSchema>;
export declare const IncentiveEvaluationContextSchema: z.ZodObject<{
    tenantId: z.ZodString;
    subjectId: z.ZodString;
    eventType: z.ZodString;
    eventId: z.ZodString;
    transaction: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        currency: z.ZodString;
        productId: z.ZodOptional<z.ZodString>;
        categoryId: z.ZodOptional<z.ZodString>;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        currency: string;
        id: string;
        amount: number;
        metadata?: Record<string, unknown> | undefined;
        productId?: string | undefined;
        categoryId?: string | undefined;
    }, {
        currency: string;
        id: string;
        amount: number;
        metadata?: Record<string, unknown> | undefined;
        productId?: string | undefined;
        categoryId?: string | undefined;
    }>>;
    timestamp: z.ZodString;
    historicalTotal: z.ZodDefault<z.ZodNumber>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    tenantId: string;
    subjectId: string;
    eventType: string;
    eventId: string;
    timestamp: string;
    historicalTotal: number;
    metadata?: Record<string, unknown> | undefined;
    transaction?: {
        currency: string;
        id: string;
        amount: number;
        metadata?: Record<string, unknown> | undefined;
        productId?: string | undefined;
        categoryId?: string | undefined;
    } | undefined;
}, {
    tenantId: string;
    subjectId: string;
    eventType: string;
    eventId: string;
    timestamp: string;
    metadata?: Record<string, unknown> | undefined;
    transaction?: {
        currency: string;
        id: string;
        amount: number;
        metadata?: Record<string, unknown> | undefined;
        productId?: string | undefined;
        categoryId?: string | undefined;
    } | undefined;
    historicalTotal?: number | undefined;
}>;
export type IncentiveEvaluationContext = z.infer<typeof IncentiveEvaluationContextSchema>;
export declare const IncentiveTraceSchema: z.ZodObject<{
    definitionId: z.ZodString;
    ruleId: z.ZodOptional<z.ZodString>;
    precedence: z.ZodEnum<["individual", "campaign", "partner", "tenant", "system"]>;
    calculation: z.ZodString;
    inputValue: z.ZodNumber;
    outputValue: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    precedence: "individual" | "campaign" | "partner" | "tenant" | "system";
    definitionId: string;
    calculation: string;
    inputValue: number;
    outputValue: number;
    ruleId?: string | undefined;
}, {
    precedence: "individual" | "campaign" | "partner" | "tenant" | "system";
    definitionId: string;
    calculation: string;
    inputValue: number;
    outputValue: number;
    ruleId?: string | undefined;
}>;
export type IncentiveTrace = z.infer<typeof IncentiveTraceSchema>;
export declare const IncentiveResultSchema: z.ZodObject<{
    id: z.ZodString;
    tenantId: z.ZodString;
    subjectId: z.ZodString;
    amount: z.ZodNumber;
    unit: z.ZodEnum<["currency", "points"]>;
    incentiveId: z.ZodString;
    depth: z.ZodNumber;
    trace: z.ZodObject<{
        definitionId: z.ZodString;
        ruleId: z.ZodOptional<z.ZodString>;
        precedence: z.ZodEnum<["individual", "campaign", "partner", "tenant", "system"]>;
        calculation: z.ZodString;
        inputValue: z.ZodNumber;
        outputValue: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        precedence: "individual" | "campaign" | "partner" | "tenant" | "system";
        definitionId: string;
        calculation: string;
        inputValue: number;
        outputValue: number;
        ruleId?: string | undefined;
    }, {
        precedence: "individual" | "campaign" | "partner" | "tenant" | "system";
        definitionId: string;
        calculation: string;
        inputValue: number;
        outputValue: number;
        ruleId?: string | undefined;
    }>;
    idempotencyKey: z.ZodString;
    eventId: z.ZodString;
    isLifetime: z.ZodDefault<z.ZodBoolean>;
    evaluatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    tenantId: string;
    unit: "currency" | "points";
    isLifetime: boolean;
    incentiveId: string;
    depth: number;
    amount: number;
    subjectId: string;
    eventId: string;
    trace: {
        precedence: "individual" | "campaign" | "partner" | "tenant" | "system";
        definitionId: string;
        calculation: string;
        inputValue: number;
        outputValue: number;
        ruleId?: string | undefined;
    };
    idempotencyKey: string;
    evaluatedAt: string;
}, {
    id: string;
    tenantId: string;
    unit: "currency" | "points";
    incentiveId: string;
    depth: number;
    amount: number;
    subjectId: string;
    eventId: string;
    trace: {
        precedence: "individual" | "campaign" | "partner" | "tenant" | "system";
        definitionId: string;
        calculation: string;
        inputValue: number;
        outputValue: number;
        ruleId?: string | undefined;
    };
    idempotencyKey: string;
    evaluatedAt: string;
    isLifetime?: boolean | undefined;
}>;
export type IncentiveResult = z.infer<typeof IncentiveResultSchema>;
export declare const IncentiveSnapshotSchema: z.ZodObject<{
    id: z.ZodString;
    tenantId: z.ZodString;
    version: z.ZodString;
    definitions: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        tenantId: z.ZodString;
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        type: z.ZodEnum<["flat", "percentage", "tiered", "multi_level", "lifetime"]>;
        unit: z.ZodEnum<["currency", "points"]>;
        status: z.ZodEnum<["active", "inactive", "expired"]>;
        flatAmount: z.ZodOptional<z.ZodNumber>;
        percentage: z.ZodOptional<z.ZodNumber>;
        tiers: z.ZodOptional<z.ZodArray<z.ZodObject<{
            minValue: z.ZodNumber;
            maxValue: z.ZodOptional<z.ZodNumber>;
            rate: z.ZodNumber;
            flatAmount: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            minValue: number;
            rate: number;
            maxValue?: number | undefined;
            flatAmount?: number | undefined;
        }, {
            minValue: number;
            rate: number;
            maxValue?: number | undefined;
            flatAmount?: number | undefined;
        }>, "many">>;
        maxDepth: z.ZodOptional<z.ZodNumber>;
        depthRates: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        isLifetime: z.ZodDefault<z.ZodBoolean>;
        validFrom: z.ZodOptional<z.ZodString>;
        validUntil: z.ZodOptional<z.ZodString>;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "flat" | "percentage" | "tiered" | "multi_level" | "lifetime";
        status: "active" | "inactive" | "expired";
        id: string;
        tenantId: string;
        name: string;
        unit: "currency" | "points";
        isLifetime: boolean;
        createdAt: string;
        updatedAt: string;
        percentage?: number | undefined;
        flatAmount?: number | undefined;
        description?: string | undefined;
        tiers?: {
            minValue: number;
            rate: number;
            maxValue?: number | undefined;
            flatAmount?: number | undefined;
        }[] | undefined;
        maxDepth?: number | undefined;
        depthRates?: number[] | undefined;
        validFrom?: string | undefined;
        validUntil?: string | undefined;
        metadata?: Record<string, unknown> | undefined;
    }, {
        type: "flat" | "percentage" | "tiered" | "multi_level" | "lifetime";
        status: "active" | "inactive" | "expired";
        id: string;
        tenantId: string;
        name: string;
        unit: "currency" | "points";
        createdAt: string;
        updatedAt: string;
        percentage?: number | undefined;
        flatAmount?: number | undefined;
        description?: string | undefined;
        tiers?: {
            minValue: number;
            rate: number;
            maxValue?: number | undefined;
            flatAmount?: number | undefined;
        }[] | undefined;
        maxDepth?: number | undefined;
        depthRates?: number[] | undefined;
        isLifetime?: boolean | undefined;
        validFrom?: string | undefined;
        validUntil?: string | undefined;
        metadata?: Record<string, unknown> | undefined;
    }>, "many">;
    rules: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        tenantId: z.ZodString;
        incentiveId: z.ZodString;
        precedence: z.ZodEnum<["individual", "campaign", "partner", "tenant", "system"]>;
        targetId: z.ZodOptional<z.ZodString>;
        campaignId: z.ZodOptional<z.ZodString>;
        overrideAmount: z.ZodOptional<z.ZodNumber>;
        overridePercentage: z.ZodOptional<z.ZodNumber>;
        overrideTiers: z.ZodOptional<z.ZodArray<z.ZodObject<{
            minValue: z.ZodNumber;
            maxValue: z.ZodOptional<z.ZodNumber>;
            rate: z.ZodNumber;
            flatAmount: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            minValue: number;
            rate: number;
            maxValue?: number | undefined;
            flatAmount?: number | undefined;
        }, {
            minValue: number;
            rate: number;
            maxValue?: number | undefined;
            flatAmount?: number | undefined;
        }>, "many">>;
        isActive: z.ZodDefault<z.ZodBoolean>;
        validFrom: z.ZodOptional<z.ZodString>;
        validUntil: z.ZodOptional<z.ZodString>;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        tenantId: string;
        createdAt: string;
        updatedAt: string;
        incentiveId: string;
        precedence: "individual" | "campaign" | "partner" | "tenant" | "system";
        isActive: boolean;
        validFrom?: string | undefined;
        validUntil?: string | undefined;
        metadata?: Record<string, unknown> | undefined;
        targetId?: string | undefined;
        campaignId?: string | undefined;
        overrideAmount?: number | undefined;
        overridePercentage?: number | undefined;
        overrideTiers?: {
            minValue: number;
            rate: number;
            maxValue?: number | undefined;
            flatAmount?: number | undefined;
        }[] | undefined;
    }, {
        id: string;
        tenantId: string;
        createdAt: string;
        updatedAt: string;
        incentiveId: string;
        precedence: "individual" | "campaign" | "partner" | "tenant" | "system";
        validFrom?: string | undefined;
        validUntil?: string | undefined;
        metadata?: Record<string, unknown> | undefined;
        targetId?: string | undefined;
        campaignId?: string | undefined;
        overrideAmount?: number | undefined;
        overridePercentage?: number | undefined;
        overrideTiers?: {
            minValue: number;
            rate: number;
            maxValue?: number | undefined;
            flatAmount?: number | undefined;
        }[] | undefined;
        isActive?: boolean | undefined;
    }>, "many">;
    relationships: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        tenantId: z.ZodString;
        referrerId: z.ZodString;
        refereeId: z.ZodString;
        depth: z.ZodNumber;
        rootReferrerId: z.ZodString;
        chain: z.ZodArray<z.ZodString, "many">;
        isActive: z.ZodDefault<z.ZodBoolean>;
        createdAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        tenantId: string;
        createdAt: string;
        isActive: boolean;
        referrerId: string;
        refereeId: string;
        depth: number;
        rootReferrerId: string;
        chain: string[];
    }, {
        id: string;
        tenantId: string;
        createdAt: string;
        referrerId: string;
        refereeId: string;
        depth: number;
        rootReferrerId: string;
        chain: string[];
        isActive?: boolean | undefined;
    }>, "many">;
    hash: z.ZodString;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    tenantId: string;
    createdAt: string;
    version: string;
    definitions: {
        type: "flat" | "percentage" | "tiered" | "multi_level" | "lifetime";
        status: "active" | "inactive" | "expired";
        id: string;
        tenantId: string;
        name: string;
        unit: "currency" | "points";
        isLifetime: boolean;
        createdAt: string;
        updatedAt: string;
        percentage?: number | undefined;
        flatAmount?: number | undefined;
        description?: string | undefined;
        tiers?: {
            minValue: number;
            rate: number;
            maxValue?: number | undefined;
            flatAmount?: number | undefined;
        }[] | undefined;
        maxDepth?: number | undefined;
        depthRates?: number[] | undefined;
        validFrom?: string | undefined;
        validUntil?: string | undefined;
        metadata?: Record<string, unknown> | undefined;
    }[];
    rules: {
        id: string;
        tenantId: string;
        createdAt: string;
        updatedAt: string;
        incentiveId: string;
        precedence: "individual" | "campaign" | "partner" | "tenant" | "system";
        isActive: boolean;
        validFrom?: string | undefined;
        validUntil?: string | undefined;
        metadata?: Record<string, unknown> | undefined;
        targetId?: string | undefined;
        campaignId?: string | undefined;
        overrideAmount?: number | undefined;
        overridePercentage?: number | undefined;
        overrideTiers?: {
            minValue: number;
            rate: number;
            maxValue?: number | undefined;
            flatAmount?: number | undefined;
        }[] | undefined;
    }[];
    relationships: {
        id: string;
        tenantId: string;
        createdAt: string;
        isActive: boolean;
        referrerId: string;
        refereeId: string;
        depth: number;
        rootReferrerId: string;
        chain: string[];
    }[];
    hash: string;
}, {
    id: string;
    tenantId: string;
    createdAt: string;
    version: string;
    definitions: {
        type: "flat" | "percentage" | "tiered" | "multi_level" | "lifetime";
        status: "active" | "inactive" | "expired";
        id: string;
        tenantId: string;
        name: string;
        unit: "currency" | "points";
        createdAt: string;
        updatedAt: string;
        percentage?: number | undefined;
        flatAmount?: number | undefined;
        description?: string | undefined;
        tiers?: {
            minValue: number;
            rate: number;
            maxValue?: number | undefined;
            flatAmount?: number | undefined;
        }[] | undefined;
        maxDepth?: number | undefined;
        depthRates?: number[] | undefined;
        isLifetime?: boolean | undefined;
        validFrom?: string | undefined;
        validUntil?: string | undefined;
        metadata?: Record<string, unknown> | undefined;
    }[];
    rules: {
        id: string;
        tenantId: string;
        createdAt: string;
        updatedAt: string;
        incentiveId: string;
        precedence: "individual" | "campaign" | "partner" | "tenant" | "system";
        validFrom?: string | undefined;
        validUntil?: string | undefined;
        metadata?: Record<string, unknown> | undefined;
        targetId?: string | undefined;
        campaignId?: string | undefined;
        overrideAmount?: number | undefined;
        overridePercentage?: number | undefined;
        overrideTiers?: {
            minValue: number;
            rate: number;
            maxValue?: number | undefined;
            flatAmount?: number | undefined;
        }[] | undefined;
        isActive?: boolean | undefined;
    }[];
    relationships: {
        id: string;
        tenantId: string;
        createdAt: string;
        referrerId: string;
        refereeId: string;
        depth: number;
        rootReferrerId: string;
        chain: string[];
        isActive?: boolean | undefined;
    }[];
    hash: string;
}>;
export type IncentiveSnapshot = z.infer<typeof IncentiveSnapshotSchema>;
//# sourceMappingURL=types.d.ts.map