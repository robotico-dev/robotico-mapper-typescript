export function mapManyItems<TSource, TTarget>(
  sources: readonly TSource[],
  mapOne: (source: TSource) => TTarget
): TTarget[] {
  const out: TTarget[] = [];
  for (const s of sources) {
    out.push(mapOne(s));
  }
  return out;
}
