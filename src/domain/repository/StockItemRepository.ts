import { StockEntry } from "../entity/StockEntry";

export interface StockItemRepository {
  getBySKU(sku: number): Promise<StockEntry | undefined>;
  save(stockItem: StockEntry): Promise<void>;
}
