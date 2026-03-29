import type { IMapperAsync } from "./i-mapper-async.js";
import { mapManyItemsConcurrent } from "./map-many-items-concurrent.js";

export function createMapperAsync<TSource, TTarget>(
  mapOne: (source: TSource) => Promise<TTarget>
): IMapperAsync<TSource, TTarget> {
  return {
    map(source: TSource): Promise<TTarget> {
      return mapOne(source);
    },
    async mapMany(sources: readonly TSource[]): Promise<TTarget[]> {
      const out: TTarget[] = [];
      for (const s of sources) {
        out.push(await mapOne(s));
      }
      return out;
    },
    mapManyConcurrent(sources, options) {
      return mapManyItemsConcurrent(sources, mapOne, options.concurrency);
    },
  };
}
