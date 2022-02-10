import { CPF } from "./cpf";
import { faker } from "@faker-js/faker";

type OrderData = {
  cpf: string;
};

type Item = {
  description: string;
  price: number;
  quantity: number;
};

class Order {
  cpf: CPF;
  items: Item[] = [];

  constructor(order: OrderData) {
    this.cpf = new CPF(order.cpf);
  }

  addItem(item: Item) {
    this.items.push(item);
  }
}

test("should not create an order with an invalid cpf", () => {
  expect(() => new Order({ cpf: "11122233344" })).toThrow();
});

test("should add an item to an order", () => {
  const order = new Order({ cpf: "935.411.347-80" });
  const product = {
    description: faker.commerce.productDescription(),
    price: faker.datatype.float({ precision: 2 }),
    quantity: faker.datatype.number(10),
  };

  order.addItem(product);

  expect(order.items[0]).toEqual(product);
});
