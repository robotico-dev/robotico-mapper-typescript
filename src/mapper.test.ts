import { describe, expect, it, vi } from "vitest";
import { isNone, isSome, none, some } from "@robotico-dev/option";
import {
  createMapper,
  createMapperAsync,
  createMapperAsyncToOption,
  createMapperToOption,
  mapManyItems,
  mapManyItemsConcurrent,
  mapThroughOption,
  mapThroughOptionAsync,
  mapThroughOptionFromNullable,
  mapThroughOptionFromNullableAsync,
  mapThroughOptionToNullable,
  mapThroughOptionToNullableAsync,
  type IMapperAsync,
  type IMapperAsyncToOption,
  type IMapperToOption,
} from "./index.js";

describe("createMapper", () => {
  it("maps single and many", () => {
    const m = createMapper((n: number) => String(n));
    expect(m.map(1)).toBe("1");
    expect(m.mapMany([1, 2, 3])).toEqual(["1", "2", "3"]);
  });

  it("mapMany empty array", () => {
    const m = createMapper((n: number) => n * 2);
    expect(m.mapMany([])).toEqual([]);
  });
});

describe("createMapperAsync", () => {
  it("mapManyConcurrent respects concurrency", async () => {
    let active = 0;
    let peak = 0;
    const m: IMapperAsync<number, number> = createMapperAsync(async (n: number) => {
      active++;
      peak = Math.max(peak, active);
      await new Promise<void>((resolve) => {
        globalThis.setTimeout(resolve, 0);
      });
      active--;
      return n * 2;
    });
    const out = await m.mapManyConcurrent([1, 2, 3, 4, 5], {
      concurrency: 2,
    });
    expect(out).toEqual([2, 4, 6, 8, 10]);
    expect(peak).toBeLessThanOrEqual(2);
  });

  it("mapManyConcurrent rejects concurrency below 1", async () => {
    const m = createMapperAsync(async (x: number) => x);
    await expect(
      m.mapManyConcurrent([1], { concurrency: 0 })
    ).rejects.toThrow(RangeError);
  });

  it("maps sequentially", async () => {
    const m = createMapperAsync(async (n: number) => String(n));
    await expect(m.map(7)).resolves.toBe("7");
    await expect(m.mapMany([1, 2])).resolves.toEqual(["1", "2"]);
  });

  it("mapMany empty", async () => {
    const m = createMapperAsync(async (x: number) => x);
    await expect(m.mapMany([])).resolves.toEqual([]);
  });

  it("propagates rejection from map", async () => {
    const m = createMapperAsync(async () => {
      throw new Error("boom");
    });
    await expect(m.map(1)).rejects.toThrow("boom");
  });
});

describe("mapManyItems", () => {
  it("maps with explicit fn", () => {
    expect(mapManyItems([1, 2], (x) => x * 2)).toEqual([2, 4]);
  });

  it("empty sources", () => {
    expect(mapManyItems([], (x: number) => x)).toEqual([]);
  });

  it("invokes mapper per item", () => {
    const fn = vi.fn((x: number) => x + 1);
    expect(mapManyItems([0, 1, 2], fn)).toEqual([1, 2, 3]);
    expect(fn).toHaveBeenCalledTimes(3);
  });
});

describe("mapManyItemsConcurrent", () => {
  it("maps in order with concurrency 1", async () => {
    const out = await mapManyItemsConcurrent(
      [1, 2, 3],
      async (x) => x * 2,
      1
    );
    expect(out).toEqual([2, 4, 6]);
  });

  it("rejects concurrency below 1", async () => {
    await expect(
      mapManyItemsConcurrent([1], async (x: number) => x, 0)
    ).rejects.toThrow(RangeError);
  });

  it("empty sources returns immediately", async () => {
    await expect(
      mapManyItemsConcurrent([], async () => 1, 3)
    ).resolves.toEqual([]);
  });
});

describe("Option mapping", () => {
  it("mapThroughOption", () => {
    const m = createMapper((n: number) => String(n));
    expect(isNone(mapThroughOption(m, none))).toBe(true);
    const o = mapThroughOption(m, some(7));
    expect(isSome(o)).toBe(true);
    if (isSome(o)) expect(o.value).toBe("7");
  });

  it("mapThroughOptionFromNullable", () => {
    const m = createMapper((n: number) => n + 1);
    expect(isNone(mapThroughOptionFromNullable(m, null))).toBe(true);
    const o = mapThroughOptionFromNullable(m, 1);
    expect(isSome(o) && o.value).toBe(2);
  });

  it("mapThroughOptionToNullable", () => {
    const m = createMapper((n: number) => (n > 0 ? n : null));
    expect(isNone(mapThroughOptionToNullable(m, some(-1)))).toBe(true);
    const o = mapThroughOptionToNullable(m, some(2));
    expect(isSome(o) && o.value).toBe(2);
  });

  it("createMapperToOption", () => {
    const m: IMapperToOption<number, string> = createMapperToOption((n) =>
      n >= 0 ? some(String(n)) : none
    );
    expect(isNone(m.map(-1))).toBe(true);
    const zero = m.map(0);
    expect(isSome(zero) && zero.value).toBe("0");
    expect(m.mapManyCompact([1, -1, 2])).toEqual(["1", "2"]);
  });

  it("createMapperToOption mapMany returns Options in order", () => {
    const m = createMapperToOption((n: number) =>
      n >= 0 ? some(String(n)) : none
    );
    const opts = m.mapMany([-1, 0, 2]);
    expect(opts).toHaveLength(3);
    expect(isNone(opts[0])).toBe(true);
    expect(isSome(opts[1]) && opts[1].value).toBe("0");
    expect(isSome(opts[2]) && opts[2].value).toBe("2");
  });

  it("mapThroughOptionAsync", async () => {
    const m = createMapperAsync(async (n: number) => String(n));
    expect(isNone(await mapThroughOptionAsync(m, none))).toBe(true);
    const o = await mapThroughOptionAsync(m, some(3));
    expect(isSome(o) && o.value).toBe("3");
  });

  it("mapThroughOptionFromNullableAsync", async () => {
    const m = createMapperAsync(async (x: number) => x * 2);
    expect(isNone(await mapThroughOptionFromNullableAsync(m, undefined))).toBe(
      true
    );
    const o = await mapThroughOptionFromNullableAsync(m, 4);
    expect(isSome(o) && o.value).toBe(8);
  });

  it("mapThroughOptionToNullableAsync", async () => {
    const m = createMapperAsync(async (n: number) =>
      n > 0 ? n : undefined
    );
    expect(
      isNone(await mapThroughOptionToNullableAsync(m, some(0)))
    ).toBe(true);
    const o = await mapThroughOptionToNullableAsync(m, some(2));
    expect(isSome(o) && o.value).toBe(2);
  });

  it("createMapperAsyncToOption", async () => {
    const m: IMapperAsyncToOption<number, string> = createMapperAsyncToOption(
      async (n) => (n % 2 === 0 ? some(String(n)) : none)
    );
    expect(isNone(await m.map(1))).toBe(true);
    const two = await m.map(2);
    expect(isSome(two) && two.value).toBe("2");
    await expect(m.mapManyCompact([1, 2, 3, 4])).resolves.toEqual(["2", "4"]);
  });

  it("createMapperAsyncToOption mapMany returns Options in order", async () => {
    const m = createMapperAsyncToOption(async (n: number) =>
      n % 2 === 0 ? some(String(n)) : none
    );
    const opts = await m.mapMany([1, 2, 3]);
    expect(opts).toHaveLength(3);
    expect(isNone(opts[0])).toBe(true);
    expect(isSome(opts[1]) && opts[1].value).toBe("2");
    expect(isNone(opts[2])).toBe(true);
  });
});
