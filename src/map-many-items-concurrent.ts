/**
 * Maps each source with `mapOne`, running at most `concurrency` operations at once.
 * Order of results matches `sources`.
 */
export async function mapManyItemsConcurrent<TSource, TTarget>(
  sources: readonly TSource[],
  mapOne: (source: TSource) => Promise<TTarget>,
  concurrency: number
): Promise<TTarget[]> {
  if (concurrency < 1) {
    throw new RangeError("concurrency must be >= 1");
  }
  if (sources.length === 0) {
    return [];
  }
  const out = new Array<TTarget>(sources.length);
  let nextIndex = 0;

  async function worker(): Promise<void> {
    for (;;) {
      const i = nextIndex++;
      if (i >= sources.length) {
        return;
      }
      out[i] = await mapOne(sources[i]!);
    }
  }

  const workers = Math.min(concurrency, sources.length);
  await Promise.all(
    Array.from({ length: workers }, () => worker())
  );
  return out;
}
