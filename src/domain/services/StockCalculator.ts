import { StockEntry } from "../entity/StockEntry";

export class StockCalculator {
  calculate(entries: StockEntry[]) {
    let total = 0;
    for (const entry of entries) {
      if (entry.operation === "in") total += entry.quantity;
      if (entry.operation === "out") total -= entry.quantity;
    }
    return total;
  }
}
