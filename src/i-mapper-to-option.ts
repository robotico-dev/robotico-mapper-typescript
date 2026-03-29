import type { Option } from "@robotico-dev/option";

/**
 * Maps sources to `Option` from `@robotico-dev/option`; absence is explicit in the result type.
 */
export interface IMapperToOption<TSource, TTarget> {
  map(source: TSource): Option<TTarget>;
  mapMany(sources: readonly TSource[]): Option<TTarget>[];
  /** Preserves order; drops `None` results (length may be less than `sources.length`). */
  mapManyCompact(sources: readonly TSource[]): TTarget[];
}
