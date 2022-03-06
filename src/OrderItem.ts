import { Dimension } from "./Dimension";

export default class OrderItem {
  constructor(
    readonly idItem: number,
    readonly price: number,
    readonly quantity: number,
  ) { }

  get total() {
    return this.price * this.quantity;
  }
}
