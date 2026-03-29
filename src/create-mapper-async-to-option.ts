import type { Option } from "@robotico-dev/option";
import { isSome } from "@robotico-dev/option";
import type { IMapperAsyncToOption } from "./i-mapper-async-to-option.js";

export function createMapperAsyncToOption<TSource, TTarget>(
  mapOne: (source: TSource) => Promise<Option<TTarget>>
): IMapperAsyncToOption<TSource, TTarget> {
  return {
    map: mapOne,
    async mapMany(sources: readonly TSource[]): Promise<Option<TTarget>[]> {
      const out: Option<TTarget>[] = [];
      for (const s of sources) {
        out.push(await mapOne(s));
      }
      return out;
    },
    async mapManyCompact(sources: readonly TSource[]): Promise<TTarget[]> {
      const out: TTarget[] = [];
      for (const s of sources) {
        const o = await mapOne(s);
        if (isSome(o)) out.push(o.value);
      }
      return out;
    },
  };
}
