import { StockEntry } from "../../../domain/entity/StockEntry";
import { StockItemRepository } from "../../../domain/repository/StockItemRepository";

export default class StockItemRepositoryMemory implements StockItemRepository {
  stockEntries: StockEntry[];

  constructor() {
    this.stockEntries = [new StockEntry(1, "in", 10)];
  }

  async getBySKU(sku: number): Promise<StockEntry | undefined> {
    return this.stockEntries.find((StockEntry) => StockEntry.idItem === sku);
  }

  async save(StockEntry: StockEntry) {
    this.stockEntries.push(StockEntry);
  }
}
