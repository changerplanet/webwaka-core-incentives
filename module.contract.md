# Module Contract: webwaka-core-incentives

**Version:** 0.0.0  
**Classification:** Core  
**Status:** Implemented

---

## Purpose

Incentives & Commissions - Pure, deterministic incentive and commission calculation engine.

---

## Scope

### In Scope

- Pure evaluation of incentive definitions
- Deterministic outputs (same input = same output)
- Ledger-ready results with idempotency keys
- Offline-safe logic via snapshot support
- Flat, percentage, tiered, and multi-level incentives
- Lifetime incentive tracking (flagged, not stored)
- Strict precedence enforcement
- Tenant isolation

### Out of Scope

- Wallets or balances
- Payouts or withdrawals
- Payment execution
- Subscription logic
- Entitlement enforcement
- UI or dashboards
- Background jobs / Cron
- External API calls
- Database persistence

---

## Capabilities

- `incentive:evaluate` - Evaluate incentives against context
- `incentive:definition.create` - Create incentive definitions
- `incentive:rule.define` - Define override rules
- `incentive:relationship.link` - Link referral relationships
- `incentive:snapshot.generate` - Generate evaluation snapshots
- `incentive:snapshot.verify` - Verify snapshot integrity

---

## Dependencies

### Required

- **zod** (^3.23.0) - Runtime type validation

### Optional

- **webwaka-core-registry** - Module registration and capability resolution

---

## Interfaces

### Public API

```typescript
// Main evaluation function
evaluateIncentives(
  definitions: IncentiveDefinition[],
  rules: IncentiveRule[],
  relationships: IncentiveRelationship[],
  context: IncentiveEvaluationContext
): IncentiveResult[]

// Snapshot functions
generateIncentiveSnapshot(params: GenerateSnapshotParams): IncentiveSnapshot
evaluateFromSnapshot(snapshot: IncentiveSnapshot, context: IncentiveEvaluationContext): IncentiveResult[]
verifySnapshotIntegrity(snapshot: IncentiveSnapshot): SnapshotVerificationResult
```

---

## Data Model

### Core Types

- **IncentiveDefinition** - Defines an incentive (flat, percentage, tiered, multi-level, lifetime)
- **IncentiveRule** - Override rules with precedence levels
- **IncentiveRelationship** - Referral chain relationships
- **IncentiveEvaluationContext** - Evaluation context with transaction info
- **IncentiveResult** - Ledger-ready evaluation result

### Precedence Order (Highest to Lowest)

1. Individual overrides
2. Campaign rules
3. Partner rules
4. Tenant rules
5. System defaults

---

## Tenant Isolation

All data is strictly isolated by `tenantId`. Cross-tenant queries are forbidden and will throw `TenantIsolationError`.

---

## Testing Requirements

- **Determinism tests** - Same inputs 10x produce identical results
- **Flat commission tests**
- **Percentage commission tests**
- **Tiered commission tests**
- **Multi-level incentive tests (depth 3)**
- **Override precedence tests**
- **Snapshot parity tests (live vs snapshot)**
- **Tampering detection tests**
- **Tenant isolation failure tests**

Current: 33 tests passing

---

## Deployment

This module is deployed as:

- **TypeScript library** - Consumable via npm or monorepo workspace
- **No runtime service** - Embedded in Suite applications
- **No UI** - Headless business logic only
- **No database** - Pure evaluation only
- **No network I/O** - Offline-safe

---

## Versioning

This module follows semantic versioning (semver). Breaking changes require a major version bump.

---

## Contact

For questions or contributions, see OWNERS.md
