import { Dimension } from "./Dimension";

export default class OrderItem {
  constructor(
    readonly idItem: number,
    readonly price: number,
    readonly quantity: number,
    readonly dimensions: Dimension
  ) {}

  get total() {
    return this.price * this.quantity;
  }

  get shippingDimension() {
    return this.dimensions.shippingDimension * this.quantity;
  }
}
