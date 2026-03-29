import type { Option } from "@robotico-dev/option";
import { none, some } from "@robotico-dev/option";
import { describe, expect, expectTypeOf, it } from "vitest";
import type { IMapper } from "./i-mapper.js";
import type { IMapperAsync } from "./i-mapper-async.js";
import type { IMapperAsyncToOption } from "./i-mapper-async-to-option.js";
import type { IMapperToOption } from "./i-mapper-to-option.js";
import { createMapper } from "./create-mapper.js";
import { createMapperAsync } from "./create-mapper-async.js";
import { createMapperAsyncToOption } from "./create-mapper-async-to-option.js";
import { createMapperToOption } from "./create-mapper-to-option.js";
import { MAPPER_VERSION } from "./mapper-version.js";

describe("API types", () => {
  it("IMapper and IMapperAsync", () => {
    const sync = createMapper((n: number) => String(n));
    expectTypeOf(sync).toMatchTypeOf<IMapper<number, string>>();
    expectTypeOf(sync.map(1)).toEqualTypeOf<string>();
    expectTypeOf(sync.mapMany([1])).toEqualTypeOf<string[]>();

    const asyncM = createMapperAsync(async (n: number) => n + 1);
    expectTypeOf(asyncM).toMatchTypeOf<IMapperAsync<number, number>>();
    expectTypeOf(asyncM.map(1)).resolves.toEqualTypeOf<number>();
  });

  it("IMapperToOption and IMapperAsyncToOption", () => {
    const mo = createMapperToOption((n: number): Option<string> =>
      n >= 0 ? some(String(n)) : none
    );
    expectTypeOf(mo).toMatchTypeOf<IMapperToOption<number, string>>();
    expectTypeOf(mo.map(1)).toEqualTypeOf<Option<string>>();
    expectTypeOf(mo.mapMany([1])).toEqualTypeOf<Option<string>[]>();

    const mao = createMapperAsyncToOption(async (n: number): Option<string> =>
      n >= 0 ? some(String(n)) : none
    );
    expectTypeOf(mao).toMatchTypeOf<IMapperAsyncToOption<number, string>>();
    expectTypeOf(mao.map(1)).resolves.toEqualTypeOf<Option<string>>();
  });

  it("MAPPER_VERSION is non-empty semver", () => {
    expect(MAPPER_VERSION).toMatch(/^\d+\.\d+\.\d+$/);
  });
});
