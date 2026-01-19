import type { IncentiveRule, IncentiveDefinition } from '../models/types.js';
import { PRECEDENCE_ORDER, type PrecedenceLevel } from '../models/enums.js';

export function findApplicableRule(
  definition: IncentiveDefinition,
  rules: readonly IncentiveRule[],
  subjectId: string,
  campaignId?: string
): IncentiveRule | undefined {
  const applicableRules = rules.filter(
    rule => rule.incentiveId === definition.id && 
            rule.tenantId === definition.tenantId &&
            rule.isActive
  );

  if (applicableRules.length === 0) return undefined;

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
