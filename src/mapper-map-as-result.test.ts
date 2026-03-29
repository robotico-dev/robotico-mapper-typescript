import { describe, expect, it } from "vitest";
import { isError, isSuccess } from "@robotico-dev/result";
import { createMapper } from "./create-mapper.js";
import { createMapperAsync } from "./create-mapper-async.js";
import { mapperMapAsResult } from "./mapper-map-as-result.js";
import { mapperMapAsyncAsResult } from "./mapper-map-async-as-result.js";

describe("mapperMapAsResult", () => {
  it("Ok on success", () => {
    const m = createMapper((n: number) => n * 2);
    const r = mapperMapAsResult(m, 4);
    expect(isSuccess(r)).toBe(true);
    if (isSuccess(r)) expect(r.value).toBe(8);
  });

  it("Err on throw", () => {
    const m = createMapper(() => {
      throw new Error("boom");
    });
    const r = mapperMapAsResult(m, 1);
    expect(isError(r)).toBe(true);
  });
});

describe("mapperMapAsyncAsResult", () => {
  it("Ok on resolve", async () => {
    const m = createMapperAsync(async (s: string) => s.length);
    const r = await mapperMapAsyncAsResult(m, "hi");
    expect(isSuccess(r)).toBe(true);
    if (isSuccess(r)) expect(r.value).toBe(2);
  });

  it("Err on reject", async () => {
    const m = createMapperAsync(async () => {
      throw new Error("x");
    });
    const r = await mapperMapAsyncAsResult(m, 0);
    expect(isError(r)).toBe(true);
  });
});
