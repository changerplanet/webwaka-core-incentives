import type { IncentiveDefinition, IncentiveRelationship } from '../models/types.js';

export interface MultiLevelParams {
  definition: IncentiveDefinition;
  inputValue: number;
  depth: number;
}

export interface MultiLevelOutput {
  amount: number;
  calculation: string;
}

export function evaluateMultiLevel(params: MultiLevelParams): MultiLevelOutput {
  const { definition, inputValue, depth } = params;
  
  const maxDepth = definition.maxDepth ?? 1;
  const depthRates = definition.depthRates ?? [];

  if (depth > maxDepth || depth < 1) {
    return { 
      amount: 0, 
      calculation: `multiLevel(depth ${depth} exceeds max ${maxDepth})` 
    };
  }

  const rateIndex = depth - 1;
  const rate = depthRates[rateIndex] ?? 0;
  
  const amount = (inputValue * rate) / 100;
  
  return {
    amount: Math.round(amount * 100) / 100,
    calculation: `multiLevel(depth ${depth}: ${inputValue} * ${rate}% = ${amount})`
  };
}

export function buildReferralChain(
  subjectId: string,
  relationships: readonly IncentiveRelationship[],
  maxDepth: number
): Array<{ referrerId: string; depth: number }> {
  const chain: Array<{ referrerId: string; depth: number }> = [];
  const visited = new Set<string>();
  let currentId = subjectId;
  let currentDepth = 1;

  while (currentDepth <= maxDepth) {
    const relationship = relationships.find(
      r => r.refereeId === currentId && r.isActive
    );

    if (!relationship) break;

    if (visited.has(relationship.referrerId)) {
      break;
    }

    visited.add(relationship.referrerId);
    chain.push({ referrerId: relationship.referrerId, depth: currentDepth });
    currentId = relationship.referrerId;
    currentDepth++;
  }

  return chain;
}
