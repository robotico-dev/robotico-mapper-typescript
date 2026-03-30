# @robotico-dev/mapper

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![Node.js](https://img.shields.io/badge/Node.js-%3E%3D20.12-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/) [![ESM](https://img.shields.io/badge/module-ESM-FFCA28)](https://nodejs.org/api/esm.html) [![Vitest](https://img.shields.io/badge/tests-Vitest-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/) [![ESLint](https://img.shields.io/badge/lint-ESLint-4B32C3?logo=eslint&logoColor=white)](https://eslint.org/)

Functional `IMapper<TSource, TTarget>` with `map` and `mapMany`, async variants, and **Option** helpers via peer **`@robotico-dev/option`**. Aligned with Robotico.Mapper (C#).

## Install

```bash
npm install @robotico-dev/mapper @robotico-dev/option
```

## Usage

```ts
import { createMapper, mapManyItems } from "@robotico-dev/mapper";
import { some, none } from "@robotico-dev/option";

const toDto = createMapper((e: { id: string }) => ({ id: e.id }));
mapManyItems([1, 2], (n) => String(n));

import { createMapperAsync, createMapperToOption, mapThroughOption } from "@robotico-dev/mapper";

const remote = createMapperAsync(async (id: string) => ({ id }));
await remote.mapMany(["a", "b"]);
await remote.mapManyConcurrent(["a", "b"], { concurrency: 4 });

const optMapper = createMapperToOption((n: number) =>
  n >= 0 ? some(String(n)) : none
);
optMapper.mapManyCompact([1, -1, 2]); // ["1", "2"]

const m = createMapper((n: number) => n * 2);
mapThroughOption(m, some(3)); // Some(6)
```

Run `npm run docs` for TypeDoc API reference.

Publishing matches other `@robotico-dev/*` packages (GitHub Packages `publishConfig`).

## License

MIT
