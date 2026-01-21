import { PRECEDENCE_ORDER } from '../models/enums.js';
export function findApplicableRule(definition, rules, subjectId, campaignId) {
    const applicableRules = rules.filter(rule => rule.incentiveId === definition.id &&
        rule.tenantId === definition.tenantId &&
        rule.isActive);
    if (applicableRules.length === 0)
        return undefined;
    const sortedRules = [...applicableRules].sort((a, b) => {
        return PRECEDENCE_ORDER[a.precedence] - PRECEDENCE_ORDER[b.precedence];
    });
    for (const rule of sortedRules) {
        if (rule.precedence === 'individual' && rule.targetId === subjectId) {
            return rule;
        }
        if (rule.precedence === 'campaign' && campaignId && rule.campaignId === campaignId) {
            return rule;
        }
        if (rule.precedence === 'partner' && rule.targetId === subjectId) {
            return rule;
        }
        if (rule.precedence === 'tenant') {
            return rule;
        }
        if (rule.precedence === 'system') {
            return rule;
        }
    }
    return undefined;
}
