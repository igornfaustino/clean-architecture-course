import { faker } from "@faker-js/faker";
import { Order } from "./Order";

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

test("should calculate order total price", () => {
  const order = new Order({ cpf: "935.411.347-80" });
  const products = [
    {
      description: faker.commerce.productDescription(),
      price: 10.0,
      quantity: 2,
    },
    {
      description: faker.commerce.productDescription(),
      price: 5.5,
      quantity: 1,
    },
    {
      description: faker.commerce.productDescription(),
      price: 3.99,
      quantity: 1,
    },
  ];

  products.forEach((product) => {
    order.addItem(product);
  });

  expect(order.getTotal()).toBe(29.49);
});

test("should return price 0 if has no order", () => {
  const order = new Order({ cpf: "935.411.347-80" });

  expect(order.getTotal()).toBe(0);
});

test("should calculate correct price with discount", () => {
  const order = new Order({ cpf: "935.411.347-80" });
  const products = [
    {
      description: faker.commerce.productDescription(),
      price: 50.0,
      quantity: 2,
    },
  ];
  order.addDiscount(0.2);
  products.forEach((product) => {
    order.addItem(product);
  });

  expect(order.getTotal()).toBe(80.0);
});

test("should have price 0 for 100% off", () => {
  const order = new Order({ cpf: "935.411.347-80" });
  const products = [
    {
      description: faker.commerce.productDescription(),
      price: 50.0,
      quantity: 2,
    },
  ];
  order.addDiscount(1);
  products.forEach((product) => {
    order.addItem(product);
  });

  expect(order.getTotal()).toBe(0);
});
