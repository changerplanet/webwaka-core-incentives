# webwaka-core-incentives

## Overview

**Incentives & Commissions** - A pure, deterministic TypeScript library for incentive and commission calculation.

This is a **Core Module** in the WebWaka modular architecture - it provides shared business logic consumed by Suite modules (POS, SVM, MVM, etc.) and does not include any UI components.

## Status

**Implemented** (v0.0.0)

## Project Structure

```
├── src/
│   ├── models/          # Zod-validated domain models
│   │   ├── enums.ts     # IncentiveType, Unit, Status, Precedence
│   │   ├── types.ts     # All schema definitions
│   │   └── index.ts
│   ├── engine/          # Core evaluation logic
│   │   ├── evaluator.ts # Main evaluateIncentives function
│   │   ├── precedence.ts # Precedence rule resolution
│   │   └── index.ts
│   ├── evaluators/      # Type-specific evaluators
│   │   ├── flat.ts
│   │   ├── percentage.ts
│   │   ├── tiered.ts
│   │   ├── multiLevel.ts
│   │   └── index.ts
│   ├── snapshots/       # Snapshot support
│   │   ├── snapshot.ts  # Generate, evaluate, verify
│   │   └── index.ts
│   ├── utils/           # Utilities
│   │   ├── hash.ts      # SHA-256 hashing
│   │   ├── validation.ts # Tenant isolation
│   │   └── index.ts
│   └── index.ts         # Main exports
├── tests/               # Vitest test suite
├── dist/                # Compiled output
├── package.json
├── tsconfig.json
├── vitest.config.ts
├── module.manifest.json
└── module.contract.md
```

## Development

### Build Commands

- `npm run build` - Compile TypeScript to JavaScript
- `npm run dev` - Watch mode for development
- `npm test` - Run test suite
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage

### Key Technologies

- TypeScript 5.x
- Node.js 20.x
- Zod 3.x (validation)
- Vitest 2.x (testing)
- ES Modules (ESM)

## Architecture

### Core Principles

1. **Pure Evaluation** - No side effects, no mutations
2. **Deterministic** - Same input always produces same output
3. **Ledger-Ready** - Results include idempotency keys
4. **Offline-Safe** - Snapshot support for offline evaluation
5. **Tenant-Isolated** - All operations scoped to tenantId

### Incentive Types Supported

- **Flat** - Fixed amount incentives
- **Percentage** - Transaction percentage
- **Tiered** - Volume-based tiers
- **Multi-Level** - Referral chains (DAG only)
- **Lifetime** - Cumulative value tracking

### Precedence Order

1. Individual overrides
2. Campaign rules
3. Partner rules
4. Tenant rules
5. System defaults

## Testing

33 tests covering:
- Determinism (Hard Stop condition)
- All incentive types
- Override precedence
- Snapshot parity
- Tampering detection
- Tenant isolation

## Dependencies

- **zod** - Runtime type validation

## Recent Changes

- Core incentive evaluation engine implemented (Jan 2026)
- Zod-validated domain models
- Snapshot support with integrity verification
- Comprehensive test suite (33 tests passing)
- Strict tenant isolation enforcement
