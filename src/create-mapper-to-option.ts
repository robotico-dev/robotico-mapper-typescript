import type { Option } from "@robotico-dev/option";
import { isSome } from "@robotico-dev/option";
import type { IMapperToOption } from "./i-mapper-to-option.js";

export function createMapperToOption<TSource, TTarget>(
  mapOne: (source: TSource) => Option<TTarget>
): IMapperToOption<TSource, TTarget> {
  return {
    map: mapOne,
    mapMany(sources: readonly TSource[]): Option<TTarget>[] {
      return sources.map(mapOne);
    },
    mapManyCompact(sources: readonly TSource[]): TTarget[] {
      const out: TTarget[] = [];
      for (const s of sources) {
        const o = mapOne(s);
        if (isSome(o)) out.push(o.value);
      }
      return out;
    },
  };
}
