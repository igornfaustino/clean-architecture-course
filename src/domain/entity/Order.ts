import { Coupon } from "./Coupon";
import { CPF } from "./cpf";
import { Freight } from "./Freight";
import { Item } from "./Item";
import { OrderCode } from "./OrderCode";
import OrderItem from "./OrderItem";

export class Order {
  cpf: CPF;
  items: OrderItem[] = [];
  coupon?: Coupon;
  freight: Freight;
  code: OrderCode

  constructor(cpf: string, readonly sequence: number, readonly issueDate: Date = new Date()) {
    this.cpf = new CPF(cpf);
    this.freight = new Freight()
    this.code = new OrderCode(issueDate, sequence)
  }

  addItem(item: Item, quantity: number) {
    this.freight.addItem(item, quantity)
    this.items.push(
      new OrderItem(item.id, item.price, quantity)
    );
  }

  addCoupon(coupon: Coupon) {
    if (!coupon.isExpired(this.issueDate)) this.coupon = coupon;
  }

  getTotal() {
    let total = this.items.reduce(
      (total, orderItem) => orderItem.total + total,
      0
    );
    if (this.coupon) total -= this.coupon.calculateDiscount(total)
    total += this.freight.calculate();
    return total
  }
}
