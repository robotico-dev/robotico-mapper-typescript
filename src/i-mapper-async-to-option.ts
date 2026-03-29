import type { Option } from "@robotico-dev/option";

/**
 * Async variant of {@link IMapperToOption} (e.g. I/O that may yield no value).
 */
export interface IMapperAsyncToOption<TSource, TTarget> {
  map(source: TSource): Promise<Option<TTarget>>;
  mapMany(sources: readonly TSource[]): Promise<Option<TTarget>[]>;
  mapManyCompact(sources: readonly TSource[]): Promise<TTarget[]>;
}
