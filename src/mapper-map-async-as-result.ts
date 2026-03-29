import type { Result } from "@robotico-dev/result";
import { tryAsync } from "@robotico-dev/result";
import type { IMapperAsync } from "./i-mapper-async.js";

/**
 * Runs {@link IMapperAsync.map} and captures rejections as `Result`.
 */
export async function mapperMapAsyncAsResult<TSource, TTarget>(
  mapper: IMapperAsync<TSource, TTarget>,
  source: TSource
): Promise<Result<TTarget>> {
  return tryAsync(() => mapper.map(source));
}
