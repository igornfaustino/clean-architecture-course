import { Item } from "./Item";

export class Freight {
  private totalWithoutDistance = 0
  private MIN_FREIGHT_VALUE = 10

  addItem(item: Item, quantity: number) {
    this.totalWithoutDistance += item.volume * item.density / 100 * quantity
  }

  calculate(distance: number = 1000) {
    const total = this.totalWithoutDistance * distance
    if (total > 0 && total < this.MIN_FREIGHT_VALUE) return this.MIN_FREIGHT_VALUE
    return total
  }
}
