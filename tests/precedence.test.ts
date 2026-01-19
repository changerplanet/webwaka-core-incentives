import { describe, it, expect } from 'vitest';
import { evaluateIncentives } from '../src/engine/evaluator.js';
import { 
  createFlatDefinition, 
  createIndividualOverrideRule,
  createCampaignRule,
  createTenantRule,
  createContext 
} from './fixtures.js';

describe('Override Precedence', () => {
  it('should apply individual override over campaign rule', () => {
    const definition = createFlatDefinition();
    const individualRule = createIndividualOverrideRule(definition.id);
    const campaignRule = createCampaignRule(definition.id);
    
    const context = createContext({
      subjectId: individualRule.targetId!,
      metadata: { campaignId: campaignRule.campaignId }
    });

    const results = evaluateIncentives(
      [definition], 
      [individualRule, campaignRule], 
      [], 
      context
    );

    expect(results).toHaveLength(1);
    expect(results[0].amount).toBe(100);
    expect(results[0].trace.precedence).toBe('individual');
  });

  it('should apply campaign rule over tenant rule', () => {
    const definition = createFlatDefinition();
    const campaignRule = createCampaignRule(definition.id);
    const tenantRule = createTenantRule(definition.id);
    
    const context = createContext({
      metadata: { campaignId: campaignRule.campaignId }
    });

    const results = evaluateIncentives(
      [definition], 
      [campaignRule, tenantRule], 
      [], 
      context
    );

    expect(results).toHaveLength(1);
    expect(results[0].amount).toBe(75);
    expect(results[0].trace.precedence).toBe('campaign');
  });

  it('should apply tenant rule when no higher precedence matches', () => {
    const definition = createFlatDefinition();
    const tenantRule = createTenantRule(definition.id);
    
    const context = createContext();

    const results = evaluateIncentives(
      [definition], 
      [tenantRule], 
      [], 
      context
    );

    expect(results).toHaveLength(1);
    expect(results[0].amount).toBe(60);
    expect(results[0].trace.precedence).toBe('tenant');
  });

  it('should use definition default when no rules match', () => {
    const definition = createFlatDefinition();
    const context = createContext();

    const results = evaluateIncentives([definition], [], [], context);

    expect(results).toHaveLength(1);
    expect(results[0].amount).toBe(50);
    expect(results[0].trace.precedence).toBe('system');
  });

  it('should not merge lower precedence rules with higher ones', () => {
    const definition = createFlatDefinition();
    const individualRule = createIndividualOverrideRule(definition.id);
    const tenantRule = createTenantRule(definition.id);
    
    const context = createContext({
      subjectId: individualRule.targetId!
    });

    const results = evaluateIncentives(
      [definition], 
      [individualRule, tenantRule], 
      [], 
      context
    );

    expect(results).toHaveLength(1);
    expect(results[0].amount).toBe(100);
  });
});
