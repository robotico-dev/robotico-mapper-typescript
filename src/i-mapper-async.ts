import type { MapperAsyncConcurrencyOptions } from "./mapper-async-concurrency-options.js";

/**
 * Async mapping (e.g. I/O-bound transforms).
 */
export interface IMapperAsync<TSource, TTarget> {
  map(source: TSource): Promise<TTarget>;
  mapMany(sources: readonly TSource[]): Promise<TTarget[]>;
  /**
   * Like {@link mapMany} but limits parallelism (see {@link MapperAsyncConcurrencyOptions}).
   */
  mapManyConcurrent(
    sources: readonly TSource[],
    options: MapperAsyncConcurrencyOptions
  ): Promise<TTarget[]>;
}
