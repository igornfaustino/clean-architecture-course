import { StockItem } from "../entity/StockItem";

export interface StockItemRepository {
  getBySKU(sku: number): Promise<StockItem | undefined>
  save(stockItem: StockItem): Promise<void>
}
