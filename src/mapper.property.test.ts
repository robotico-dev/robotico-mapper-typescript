import { describe, it } from "vitest";
import fc from "fast-check";
import { createMapper } from "./create-mapper.js";
import { mapManyItems } from "./map-many-items.js";

describe("mapper properties", () => {
  it("mapManyItems matches sequential map", () => {
    fc.assert(
      fc.property(fc.array(fc.integer()), (arr) => {
        const double = (n: number) => n * 2;
        const m = createMapper(double);
        return (
          JSON.stringify(mapManyItems(arr, double)) ===
          JSON.stringify(m.mapMany(arr))
        );
      }),
      { numRuns: 50 }
    );
  });
});
