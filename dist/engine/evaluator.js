import { evaluateFlat } from '../evaluators/flat.js';
import { evaluatePercentage } from '../evaluators/percentage.js';
import { evaluateTiered } from '../evaluators/tiered.js';
import { evaluateMultiLevel, buildReferralChain } from '../evaluators/multiLevel.js';
import { findApplicableRule } from './precedence.js';
import { generateIdempotencyKey, generateUUID } from '../utils/hash.js';
import { validateTenantIsolation, validateReferralChainTenantScope } from '../utils/validation.js';
export function evaluateIncentives(definitions, rules, relationships, context) {
    validateTenantIsolation(context.tenantId, definitions, rules, relationships);
    validateReferralChainTenantScope(context.tenantId, relationships);
    const results = [];
    const timestamp = context.timestamp;
    const inputValue = context.transaction?.amount ?? 0;
    const activeDefinitions = definitions.filter(def => {
        if (def.status !== 'active')
            return false;
        if (def.tenantId !== context.tenantId)
            return false;
        if (def.validFrom && new Date(def.validFrom) > new Date(timestamp))
            return false;
        if (def.validUntil && new Date(def.validUntil) < new Date(timestamp))
            return false;
        return true;
    });
    for (const definition of activeDefinitions) {
        const campaignId = context.metadata?.campaignId;
        const rule = findApplicableRule(definition, rules, context.subjectId, campaignId);
        if (definition.type === 'multi_level') {
            const multiLevelResults = evaluateMultiLevelIncentive(definition, rules, relationships, context, inputValue);
            results.push(...multiLevelResults);
        }
        else {
            const result = evaluateSingleIncentive(definition, rule, context, inputValue, 0);
            if (result.amount > 0) {
                results.push(result);
            }
        }
    }
    return results;
}
function evaluateSingleIncentive(definition, rule, context, inputValue, depth) {
    let evaluation;
    switch (definition.type) {
        case 'flat':
            evaluation = evaluateFlat({ definition, rule, inputValue });
            break;
        case 'percentage':
            evaluation = evaluatePercentage({ definition, rule, inputValue });
            break;
        case 'tiered':
            evaluation = evaluateTiered({ definition, rule, inputValue });
            break;
        case 'lifetime':
            const historicalValue = context.historicalTotal + inputValue;
            evaluation = evaluateTiered({
                definition,
                rule,
                inputValue: historicalValue
            });
            break;
        default:
            evaluation = { amount: 0, calculation: 'unknown type' };
    }
    const trace = {
        definitionId: definition.id,
        ruleId: rule?.id,
        precedence: rule?.precedence ?? 'system',
        calculation: evaluation.calculation,
        inputValue,
        outputValue: evaluation.amount
    };
    const idempotencyKey = generateIdempotencyKey(context.tenantId, context.eventId, definition.id, context.subjectId, depth);
    return {
        id: generateUUID(),
        tenantId: context.tenantId,
        subjectId: context.subjectId,
        amount: evaluation.amount,
        unit: definition.unit,
        incentiveId: definition.id,
        depth,
        trace,
        idempotencyKey,
        eventId: context.eventId,
        isLifetime: definition.isLifetime,
        evaluatedAt: context.timestamp
    };
}
function evaluateMultiLevelIncentive(definition, rules, relationships, context, inputValue) {
    const results = [];
    const maxDepth = definition.maxDepth ?? 1;
    const referralChain = buildReferralChain({
        subjectId: context.subjectId,
        relationships,
        maxDepth,
        tenantId: context.tenantId
    });
    for (const { referrerId, depth } of referralChain) {
        const evaluation = evaluateMultiLevel({
            definition,
            inputValue,
            depth
        });
        if (evaluation.amount <= 0)
            continue;
        const trace = {
            definitionId: definition.id,
            ruleId: undefined,
            precedence: 'system',
            calculation: evaluation.calculation,
            inputValue,
            outputValue: evaluation.amount
        };
        const idempotencyKey = generateIdempotencyKey(context.tenantId, context.eventId, definition.id, referrerId, depth);
        results.push({
            id: generateUUID(),
            tenantId: context.tenantId,
            subjectId: referrerId,
            amount: evaluation.amount,
            unit: definition.unit,
            incentiveId: definition.id,
            depth,
            trace,
            idempotencyKey,
            eventId: context.eventId,
            isLifetime: definition.isLifetime,
            evaluatedAt: context.timestamp
        });
    }
    return results;
}
