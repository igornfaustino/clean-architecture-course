import { CPF } from "./cpf";

type OrderData = {
  cpf: string;
};

type Item = {
  description: string;
  price: number;
  quantity: number;
};

export class Order {
  cpf: CPF;
  items: Item[] = [];
  discount: number = 0;

  constructor(order: OrderData) {
    this.cpf = new CPF(order.cpf);
  }

  addItem(item: Item) {
    this.items.push(item);
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
