import { Coupon } from "../../../domain/entity/Coupon";
import { Dimension } from "../../../domain/entity/Dimension";
import { Item } from "../../../domain/entity/Item";
import { Order } from "../../../domain/entity/Order";
import { Connection } from "../../database/Connection";
import PostgreSQLConnectionAdapter from "../../database/PostgreSQLConnectionAdapter";
import OrderRepositoryDatabase from "./OrderRepositoryDatabase";

let connection: Connection;

beforeEach(async function () {
  connection = new PostgreSQLConnectionAdapter();
});

test("Should create a new order", async function () {
  const orderRepository = new OrderRepositoryDatabase(connection);
  await orderRepository.clean();
  const order = new Order('469.961.898-70', 1, new Date('2020-02-03'))
  order.addItem(new Item(1, "Instrumentos Musicais", "Guitarra", 1000, new Dimension(100, 30, 10), 3), 1);
  order.addItem(new Item(2, "Instrumentos Musicais", "Amplificador", 5000, new Dimension(100, 50, 50), 20), 1);
  order.addItem(new Item(3, "Instrumentos Musicais", "Cabo", 30, new Dimension(10, 10, 10), 1), 3);
  const coupon = new Coupon("VALE20", 20);
  order.addCoupon(coupon);

  await orderRepository.save(order);

  const savedOrder = await orderRepository.getByCode("202000000001");
  expect(savedOrder?.cpf.cpf).toBe("46996189870");
  expect(savedOrder?.coupon?.code).toBe("VALE20");
  expect(savedOrder?.getTotal()).toBe(5132);
  expect(savedOrder?.freight.calculate()).toBe(260);
});

test("Should count orders", async function () {
  const orderRepository = new OrderRepositoryDatabase(connection);
  await orderRepository.clean();
  await orderRepository.save(new Order('469.961.898-70', 1, new Date('2020-02-03')));
  await orderRepository.save(new Order('469.961.898-70', 2, new Date('2020-02-03')));
  await orderRepository.save(new Order('469.961.898-70', 3, new Date('2020-02-03')));

  const count = await orderRepository.count()

  expect(count).toBe(3)
});

test("Deve listar os pedidos", async function () {
  const orderRepository = new OrderRepositoryDatabase(connection);
  await orderRepository.clean();
  const order = new Order("935.411.347-80", 1, new Date("2021-03-01T10:00:00"));
  order.addItem(new Item(1, "Instrumentos Musicais", "Guitarra", 1000, new Dimension(100, 30, 10), 3), 1);
  order.addItem(new Item(2, "Instrumentos Musicais", "Amplificador", 5000, new Dimension(100, 50, 50), 20), 1);
  order.addItem(new Item(3, "Instrumentos Musicais", "Cabo", 30, new Dimension(10, 10, 10), 1), 3);
  const coupon = new Coupon("VALE20", 20);
  order.addCoupon(coupon);

  await orderRepository.save(order);
  await orderRepository.save(order);
  await orderRepository.save(order);

  const count = await orderRepository.count();
  expect(count).toBe(3);
  const savedOrders = await orderRepository.getAll();
  expect(savedOrders).toHaveLength(3);
  const [savedOrder1, savedOrder2, savedOrder3] = savedOrders;
  expect(savedOrder3.getTotal()).toBe(5132);
});

afterEach(async function () {
  await connection.close();
});
