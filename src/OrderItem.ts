import { Dimension } from "./Dimension";

export default class OrderItem {
  dimension: Dimension;

  constructor(
    readonly idItem: number,
    readonly price: number,
    readonly quantity: number,
    width: number,
    height: number,
    length: number,
    weight: number
  ) {
    this.dimension = new Dimension(width, height, length, weight);
  }

  get total() {
    return this.price * this.quantity;
  }

  get shippingDimension() {
    return (
      (this.dimension.density / 100) * this.dimension.volume * this.quantity
    );
  }
}
