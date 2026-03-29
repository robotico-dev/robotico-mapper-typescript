import type { Option } from "@robotico-dev/option";
import { bindAsync, fromNullable, some } from "@robotico-dev/option";
import type { IMapperAsync } from "./i-mapper-async.js";

/**
 * Async variant of {@link mapThroughOption}.
 */
export async function mapThroughOptionAsync<TSource, TTarget>(
  mapper: IMapperAsync<TSource, TTarget>,
  source: Option<TSource>
): Promise<Option<TTarget>> {
  return bindAsync(source, async (s) => some(await mapper.map(s)));
}

export async function mapThroughOptionFromNullableAsync<TSource, TTarget>(
  mapper: IMapperAsync<TSource, TTarget>,
  source: TSource | null | undefined
): Promise<Option<TTarget>> {
  return mapThroughOptionAsync(mapper, fromNullable(source));
}

export async function mapThroughOptionToNullableAsync<TSource, TTarget>(
  mapper: IMapperAsync<TSource, TTarget | null | undefined>,
  source: Option<TSource>
): Promise<Option<TTarget>> {
  return bindAsync(source, async (s) => fromNullable(await mapper.map(s)));
}
