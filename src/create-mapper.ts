import type { IMapper } from "./i-mapper.js";
import { mapManyItems } from "./map-many-items.js";

export function createMapper<TSource, TTarget>(
  mapOne: (source: TSource) => TTarget
): IMapper<TSource, TTarget> {
  return {
    map: mapOne,
    mapMany(sources: readonly TSource[]): TTarget[] {
      return mapManyItems(sources, mapOne);
    },
  };
}
