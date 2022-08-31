import { StockEntry } from "../../../domain/entity/StockEntry";
import { StockEntryRepository } from "../../../domain/repository/StockItemRepository";

export default class StockEntryRepositoryMemory
  implements StockEntryRepository
{
  stockEntries: StockEntry[];

  constructor() {
    this.stockEntries = [];
  }

  async clean(): Promise<void> {
    this.stockEntries = [];
  }

  async getAll(idItem: number): Promise<StockEntry[]> {
    return this.stockEntries.filter(
      (StockEntry) => StockEntry.idItem === idItem
    );
  }

  async save(stockEntry: StockEntry) {
    this.stockEntries.push(stockEntry);
  }
}
