import { Coupon } from "../../../domain/entity/Coupon";
import { Item } from "../../../domain/entity/Item";
import { Order } from "../../../domain/entity/Order";
import { Connection } from "../../database/Connection";
import PostgreSQLConnectionAdapter from "../../database/PostgreSQLConnectionAdapter";
import OrderRepositoryDatabase from "./OrderRepositoryDatabase";

let connection: Connection;

beforeEach(async function () {
	connection = new PostgreSQLConnectionAdapter();
  await connection.query('delete from ccca.orderItem', [])
  await connection.query('delete from ccca.order', [])
});

test("Should create a new order", async function () {
	const orderRepository = new OrderRepositoryDatabase(connection);
  const order = new Order('469.961.898-70', 1, new Date('2020-02-03'))
  order.addCoupon(new Coupon('VALE20', 20))
  order.addItem(new Item(1, 'musica', 'guitarra', 1000), 3)
	
  await orderRepository.save(order);
	
  const [savedOrder] = await connection.query(`select * from ccca.order where code = $1`, [order.code.value])
  expect(savedOrder.cpf).toBe("46996189870");
  expect(savedOrder.coupon).toBe("VALE20");
  const [orderItem] = await connection.query(`select * from ccca.orderItem where orderid = $1`, [order.code.value])
  expect(orderItem.itemid).toBe(1)
  expect(orderItem.quantity).toBe(3)
});

test("Should count orders", async function () {
	const orderRepository = new OrderRepositoryDatabase(connection);
  await orderRepository.save(new Order('469.961.898-70', 1, new Date('2020-02-03')));
  await orderRepository.save(new Order('469.961.898-70', 2, new Date('2020-02-03')));
  await orderRepository.save(new Order('469.961.898-70', 3, new Date('2020-02-03')));
	
  const count = await orderRepository.count()

  expect(count).toBe(3)
});

afterEach(async function () {
	await connection.close();
});
