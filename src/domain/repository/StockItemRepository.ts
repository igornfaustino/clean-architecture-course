import { StockEntry } from "../entity/StockEntry";

export interface StockEntryRepository {
  getAll(idItem: number): Promise<StockEntry[]>;
  save(stockItem: StockEntry): Promise<void>;
  clean(): Promise<void>;
}
