/**
 * @robotico-dev/mapper — functional object mapping (with `@robotico-dev/option` helpers).
 *
 * @packageDocumentation
 */

export type { IMapper } from "./i-mapper.js";
export type { IMapperAsync } from "./i-mapper-async.js";
export type { IMapperToOption } from "./i-mapper-to-option.js";
export type { IMapperAsyncToOption } from "./i-mapper-async-to-option.js";
export type { MapperAsyncConcurrencyOptions } from "./mapper-async-concurrency-options.js";
export { createMapper } from "./create-mapper.js";
export { createMapperAsync } from "./create-mapper-async.js";
export { createMapperToOption } from "./create-mapper-to-option.js";
export { createMapperAsyncToOption } from "./create-mapper-async-to-option.js";
export {
  mapThroughOption,
  mapThroughOptionFromNullable,
  mapThroughOptionToNullable,
} from "./map-through-option.js";
export {
  mapThroughOptionAsync,
  mapThroughOptionFromNullableAsync,
  mapThroughOptionToNullableAsync,
} from "./map-through-option-async.js";
export { mapManyItems } from "./map-many-items.js";
export { mapManyItemsConcurrent } from "./map-many-items-concurrent.js";
export { mapperMapAsResult } from "./mapper-map-as-result.js";
export { mapperMapAsyncAsResult } from "./mapper-map-async-as-result.js";
export { MAPPER_VERSION } from "./mapper-version.js";
