import { Coupon } from "./Coupon";
import { Dimension } from "./Dimension";
import { Item } from "./Item";
import { Order } from "./Order";

const createItem = ({
  id = 1,
  category = "Instrumentos Musicais",
  description = "Guitarra",
  price = 1000,
  width = 100,
  height = 30,
  length = 10,
  weight = 3,
} = {}) => {
  const dimension = new Dimension(width, height, length, weight);
  return new Item(id, category, description, price, dimension);
};

describe("Order", () => {
  test("should not create an order with an invalid cpf", () => {
    expect(() => new Order("11122233344")).toThrow();
  });

  test("should add an item to an order", () => {
    const order = new Order("935.411.347-80");
    const product = createItem();

    order.addItem(product, 1);

    expect(order.items[0].idItem).toBe(product.id);
  });

  test("should calculate order total price", () => {
    const order = new Order("935.411.347-80");

    order.addItem(createItem({ price: 1000 }), 1);
    order.addItem(createItem({ price: 5000 }), 1);
    order.addItem(createItem({ price: 30 }), 3);

    expect(order.getTotal()).toBe(6090);
  });

  test("should return price 0 if has no order", () => {
    const order = new Order("935.411.347-80");

    expect(order.getTotal()).toBe(0);
  });

  test("should calculate correct price with discount", () => {
    const order = new Order("935.411.347-80");
    order.addItem(createItem({ price: 100 }), 1);
    order.addCoupon(new Coupon("OFF20", 20));

    expect(order.getTotal()).toBe(80.0);
  });

  test("should have price 0 for 100% off", () => {
    const order = new Order("935.411.347-80");

    order.addCoupon(new Coupon("OFF100", 100));
    order.addItem(createItem({ price: 100 }), 2);

    expect(order.getTotal()).toBe(0);
  });

  test("should calculate correct price with discount when coupon is valid", () => {
    const order = new Order("935.411.347-80", new Date("2022-02-19"));
    order.addItem(createItem({ price: 100 }), 1);
    order.addCoupon(new Coupon("OFF20", 20, new Date("2022-02-20")));

    expect(order.getTotal()).toBe(80.0);
  });

  test("should not apply discount if coupon is invalid", () => {
    const order = new Order("935.411.347-80", new Date("2022-02-21"));

    order.addItem(createItem({ price: 1000 }), 1);
    order.addItem(createItem({ price: 5000 }), 1);
    order.addItem(createItem({ price: 30 }), 3);
    order.addCoupon(new Coupon("OFF100", 100, new Date("2022-02-20")))

    expect(order.getTotal()).toBe(6090);
  });

  test("should return min shipping price when value is lower", () => {
    const order = new Order("935.411.347-80");

    const shipping = order.getShippingPrice(1000);

    expect(shipping).toBe(10);
  });

  test("should return shipping price", () => {
    const order = new Order("935.411.347-80");
    order.addItem(
      createItem({ width: 100, height: 30, length: 10, weight: 3 }),
      1
    );

    const shipping = order.getShippingPrice(1000);

    expect(shipping).toBe(30);
  });
});
