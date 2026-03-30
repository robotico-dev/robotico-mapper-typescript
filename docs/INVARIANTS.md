# Mapper invariants

1. **Factory mappers** — `createMapper` / async / option variants return functions that do not mutate inputs unless the user’s mapping function does.
2. **Option pipeline** — `mapThroughOption*` preserves `None` without invoking downstream mappers; `Some` flows through in order.
3. **Result helpers** — `mapperMapAsResult` / async variants surface mapping exceptions or user errors as `Err` per implementation.
4. **Concurrency** — `mapManyItemsConcurrent` respects `MapperAsyncConcurrencyOptions` for max parallelism and ordering of outputs.
