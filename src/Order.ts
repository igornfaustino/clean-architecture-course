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

  constructor(order: OrderData) {
    this.cpf = new CPF(order.cpf);
  }

  addItem(item: Item, quantity: number) {
    this.items.push(new OrderItem(item.id, item.price, quantity));
  }

  addDiscount(percentage: number) {
    this.discount = percentage;
  }

  getTotal() {
    const total = this.items.reduce(
      (total, item) => item.quantity * item.price + total,
      0
    );
    const discountValue = total * this.discount;
    const finalPrice = total - discountValue;
    return parseFloat(finalPrice.toFixed(2));
  }
}
