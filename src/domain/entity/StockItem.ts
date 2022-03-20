export class StockItem {
  constructor(readonly sku: number, private quantity: number) {

  }

  increase(quantity: number) {
    this.quantity += quantity
  }

  decrease(quantity: number) {
    this.quantity -= quantity
    if (this.quantity < 0) throw new Error("invalid stock quantity")
  }

  getQuantity() {
    return this.quantity
  }
}
