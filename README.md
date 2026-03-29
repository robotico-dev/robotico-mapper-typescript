# @robotico-dev/mapper

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
