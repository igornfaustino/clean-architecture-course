export default class OrderItem {
  constructor(
    readonly idItem: number,
    readonly price: number,
    readonly quantity: number,
    readonly volume: number,
    readonly density: number
  ) {}

  get total() {
    return this.price * this.quantity;
  }
}
