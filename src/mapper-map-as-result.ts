import type { Result } from "@robotico-dev/result";
import { tryResult } from "@robotico-dev/result";
import type { IMapper } from "./i-mapper.js";

/**
 * Runs {@link IMapper.map} and captures thrown errors as `Result` (e.g. mapping contract violations).
 */
export function mapperMapAsResult<TSource, TTarget>(
  mapper: IMapper<TSource, TTarget>,
  source: TSource
): Result<TTarget> {
  return tryResult(() => mapper.map(source));
}
