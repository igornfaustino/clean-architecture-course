import { faker } from "@faker-js/faker";
import { Coupon } from "./Coupon";
import { Item } from "./Item";
import { Order } from "./Order";

test("should not create an order with an invalid cpf", () => {
  expect(() => new Order({ cpf: "11122233344" })).toThrow();
});

test("should add an item to an order", () => {
  const order = new Order({ cpf: "935.411.347-80" });
  const product = new Item(1, "Instrumentos Musicais", "Guitarra", 1000);

  order.addItem(product, 1);

  expect(order.items[0].idItem).toBe(product.id);
});

test("should calculate order total price", () => {
  const order = new Order({ cpf: "935.411.347-80" });

  order.addItem(new Item(1, "Instrumentos Musicais", "Guitarra", 1000), 1);
  order.addItem(new Item(1, "Instrumentos Musicais", "Amplificador", 5000), 1);
  order.addItem(new Item(1, "Instrumentos Musicais", "Cabo", 30), 3);

  expect(order.getTotal()).toBe(6090);
});

test("should return price 0 if has no order", () => {
  const order = new Order({ cpf: "935.411.347-80" });

  expect(order.getTotal()).toBe(0);
});

test("should calculate correct price with discount", () => {
  const order = new Order({ cpf: "935.411.347-80" });
  order.addItem(new Item(1, "Instrumentos Musicais", "Guitarra", 100), 1);
  order.addCoupon(new Coupon("OFF20", 20));

  expect(order.getTotal()).toBe(80.0);
});

test("should have price 0 for 100% off", () => {
  const order = new Order({ cpf: "935.411.347-80" });

  order.addCoupon(new Coupon("OFF100", 100));
  order.addItem(new Item(1, "Instrumentos Musicais", "Guitarra", 50), 2);

  expect(order.getTotal()).toBe(0);
});

test("should throw an error if coupon is invalid", () => {
  const order = new Order({ cpf: "935.411.347-80" });
  jest.useFakeTimers().setSystemTime(new Date("2022-02-21"));

  expect(() =>
    order.addCoupon(new Coupon("OFF100", 100, new Date("2022-02-20")))
  ).toThrow();
});
