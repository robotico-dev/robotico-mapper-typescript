import type { Option } from "@robotico-dev/option";
import { bind, fromNullable, some } from "@robotico-dev/option";
import type { IMapper } from "./i-mapper.js";

/**
 * Applies a sync mapper when `source` is `Some`; otherwise `None`.
 */
export function mapThroughOption<TSource, TTarget>(
  mapper: IMapper<TSource, TTarget>,
  source: Option<TSource>
): Option<TTarget> {
  return bind(source, (s) => some(mapper.map(s)));
}

/**
 * Lifts a nullable source through `fromNullable`, then {@link mapThroughOption}.
 */
export function mapThroughOptionFromNullable<TSource, TTarget>(
  mapper: IMapper<TSource, TTarget>,
  source: TSource | null | undefined
): Option<TTarget> {
  return mapThroughOption(mapper, fromNullable(source));
}

/**
 * Like {@link mapThroughOption} but maps nullable mapper outputs to `Option` (null/undefined → `None`).
 */
export function mapThroughOptionToNullable<TSource, TTarget>(
  mapper: IMapper<TSource, TTarget | null | undefined>,
  source: Option<TSource>
): Option<TTarget> {
  return bind(source, (s) => fromNullable(mapper.map(s)));
}
