import { StockItemRepository } from "../../../domain/repository/StockItemRepository";

export class UpdateStock {
  constructor(readonly stockItemRepository: StockItemRepository) { }

  async execute(sku: number, action: 'sell' | 'restock', quantity: number) {
    const item = await this.stockItemRepository.getBySKU(sku)
    if (!item) throw new Error('item not in stock')
    if (action === 'restock') item.increase(quantity)
    if (action === 'sell') item.decrease(quantity)
    this.stockItemRepository.save(item)
    return {
      total: item.getQuantity()
    }
  }
}
