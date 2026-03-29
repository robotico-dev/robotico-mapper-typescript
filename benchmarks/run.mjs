import { Bench } from "tinybench";
import { mapManyItems } from "../dist/index.js";

const items = Array.from({ length: 100 }, (_, i) => i);
const mapOne = (n) => ({ x: n });

const bench = new Bench({ time: 400 });
bench.add("mapManyItems x100", () => {
  mapManyItems(items, mapOne);
});

await bench.run();
console.table(bench.table());
