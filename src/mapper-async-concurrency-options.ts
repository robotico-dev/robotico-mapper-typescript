/** Options for {@link IMapperAsync.mapManyConcurrent}. */
export interface MapperAsyncConcurrencyOptions {
  /** Maximum in-flight `map` operations (minimum 1). */
  readonly concurrency: number;
}
