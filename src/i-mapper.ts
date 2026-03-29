/**
 * Maps one instance of `TSource` to `TTarget`.
 */
export interface IMapper<TSource, TTarget> {
  map(source: TSource): TTarget;
  mapMany(sources: readonly TSource[]): TTarget[];
}
