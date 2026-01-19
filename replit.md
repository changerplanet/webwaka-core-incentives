# webwaka-core-incentives

## Overview

**Incentives & Commissions** - A headless TypeScript library for incentive and commission calculation.

This is a **Core Module** in the WebWaka modular architecture - it provides shared business logic consumed by Suite modules (POS, SVM, MVM, etc.) and does not include any UI components.

## Status

Infrastructure Ready - Implementation Pending (v0.0.0)

## Project Structure

```
├── src/              # TypeScript source files
│   └── index.ts      # Main entry point and exports
├── dist/             # Compiled JavaScript output (generated)
├── package.json      # NPM package configuration
├── tsconfig.json     # TypeScript compiler configuration
├── module.manifest.json  # WebWaka module metadata
└── module.contract.md    # API contract documentation
```

## Development

### Build Commands

- `npm run build` - Compile TypeScript to JavaScript
- `npm run dev` - Watch mode for development
- `npm test` - Run tests (not yet implemented)

### Key Technologies

- TypeScript 5.x
- Node.js 20.x
- ES Modules (ESM)

## Architecture

This module exports:
- TypeScript interfaces and types
- Business logic functions
- No runtime services or UI components

All data is strictly isolated by `tenantId` - cross-tenant queries are forbidden.

## Dependencies

- `webwaka-core-registry` - Module registration and capability resolution (not yet implemented)

## Recent Changes

- Initial Replit environment setup (Jan 2026)
- Created placeholder source structure
- Configured TypeScript build pipeline
