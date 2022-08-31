import { StockEntry } from "./StockEntry";

describe(StockEntry.name, () => {
  test("should create an stock entry", () => {
    const stockEntry = new StockEntry(1, "in", 6);

    expect(stockEntry.idItem).toBe(1);
    expect(stockEntry.operation).toBe("in");
    expect(stockEntry.quantity).toBe(6);
  });
});
