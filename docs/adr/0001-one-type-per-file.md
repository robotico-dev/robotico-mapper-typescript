# ADR 0001: One type per file

## Status

Accepted

## Decision

Mapper contracts are split: sync mapper, async mapper, concurrency options — one type-bearing export per file.

## Consequences

Thin modules; easy to add optional capabilities without bloating a single type definition file.
