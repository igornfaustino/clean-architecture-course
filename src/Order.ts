import { Coupon } from "./Coupon";
import { CPF } from "./cpf";
import { Item } from "./Item";
import OrderItem from "./OrderItem";

type OrderData = {
  cpf: string;
};

export class Order {
  cpf: CPF;
  items: OrderItem[] = [];
  discount: number = 0;
  coupon?: Coupon;

  constructor(order: OrderData) {
    this.cpf = new CPF(order.cpf);
  }

  addItem(item: Item, quantity: number) {
    this.items.push(
      new OrderItem(
        item.id,
        item.price,
        quantity,
        item.width,
        item.height,
        item.length,
        item.weight
      )
    );
  }

  addCoupon(coupon: Coupon) {
    if (!coupon.isValid) throw new Error("Coupon is expired");
    this.coupon = coupon;
  }

  getTotal() {
    const total = this.items.reduce(
      (total, orderItem) => orderItem.total + total,
      0
    );
    if (this.coupon) {
      return this.getTotalWithDiscount(total, this.coupon.percentage);
    }
    return total;
  }

  private getTotalWithDiscount(total: number, percentage: number) {
    const discountValue = (total * percentage) / 100;
    return total - discountValue;
  }

  getShippingPrice(distance: number) {
    const totalItemsSpace = this.items.reduce(
      (total, item) =>
        total +
        (item.dimension.density / 100) * item.dimension.volume * item.quantity,
      0
    );
    const calculateShipping = distance * totalItemsSpace;
    const shippingPrice = calculateShipping < 10 ? 10 : calculateShipping;
    return parseFloat(shippingPrice.toFixed(2));
  }
}
