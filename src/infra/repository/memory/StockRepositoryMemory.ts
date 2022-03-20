import { StockItem } from "../../../domain/entity/StockItem";
import { StockItemRepository } from "../../../domain/repository/StockItemRepository";

export default class StockItemRepositoryMemory implements StockItemRepository {
  stockItems: StockItem[];

  constructor() {
    this.stockItems = [
      new StockItem(1, 10)
    ];
  }


  async getBySKU(sku: number): Promise<StockItem | undefined> {
    return this.stockItems.find(stockItem => stockItem.sku === sku)
  }

  async save(stockItem: StockItem) {
    this.stockItems.push(stockItem);
  }
}
