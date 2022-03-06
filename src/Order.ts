import { Coupon } from "./Coupon";
import { CPF } from "./cpf";
import { Item } from "./Item";
import OrderItem from "./OrderItem";

export class Order {
  cpf: CPF;
  items: OrderItem[] = [];
  discount: number = 0;
  coupon?: Coupon;

  constructor(cpf: string, readonly issueDate: Date = new Date()) {
    this.cpf = new CPF(cpf);
  }

  addItem(item: Item, quantity: number) {
    this.items.push(
      new OrderItem(item.id, item.price, quantity, item.dimensions)
    );
  }

  addCoupon(coupon: Coupon) {
    if (!coupon.isExpired(this.issueDate)) this.coupon = coupon;
  }

  getTotal() {
    const total = this.items.reduce(
      (total, orderItem) => orderItem.total + total,
      0
    );
    if (this.coupon) return total - this.coupon.calculateDiscount(total)
    return total;
  }

  getShippingPrice(distance: number) {
    const totalShippingDimension = this.items.reduce(
      (total, item) => total + item.shippingDimension,
      0
    );
    const calculateShipping = distance * totalShippingDimension;
    const shippingPrice = calculateShipping < 10 ? 10 : calculateShipping;
    return parseFloat(shippingPrice.toFixed(2));
  }
}
