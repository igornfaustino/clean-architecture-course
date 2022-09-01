import { Connection } from "../../../infra/database/Connection";
import PostgreSQLConnectionAdapter from "../../../infra/database/PostgreSQLConnectionAdapter";
import { DatabaseRepositoryFactory } from "../../../infra/factory/DatabaseRepositoryFactory";
import { GetStock } from "../getStock/GetStock";
import { PlaceOrder } from "./PlaceOrder";

let connection: Connection;

const setup = (connection: Connection) => {
  const repositoryFactory = new DatabaseRepositoryFactory(connection);
  const placeOrder = new PlaceOrder(repositoryFactory);
  const orderRepository = repositoryFactory.createOrderRepository();
  const getStock = new GetStock(repositoryFactory);
  return { placeOrder, orderRepository, getStock };
};

beforeAll(async function () {
  connection = new PostgreSQLConnectionAdapter();
});

test("Should place an order", async () => {
  const { placeOrder, orderRepository } = setup(connection);
  await orderRepository.clean();
  const placeOrderInput = {
    cpf: "935.411.347-80",
    orderItems: [
      { idItem: 1, quantity: 1 },
      { idItem: 2, quantity: 1 },
      { idItem: 3, quantity: 3 },
    ],
    coupon: "VALE20",
  };

  const output = await placeOrder.execute(placeOrderInput);

  expect(output.total).toBe(5132);
});

test("Should create an order", async () => {
  const { placeOrder, orderRepository } = setup(connection);
  await orderRepository.clean();
  const placeOrderInput = {
    cpf: "935.411.347-80",
    orderItems: [
      { idItem: 1, quantity: 1 },
      { idItem: 2, quantity: 1 },
      { idItem: 3, quantity: 3 },
    ],
    coupon: "VALE20",
    issueDate: new Date("2021-02-19"),
  };

  await placeOrder.execute(placeOrderInput);
  const output = await placeOrder.execute(placeOrderInput);

  expect(output.code).toBe("202100000002");
});

test("Should update stock when order is created", async () => {
  const { placeOrder, orderRepository, getStock } = setup(connection);
  await orderRepository.clean();
  const placeOrderInput = {
    cpf: "935.411.347-80",
    orderItems: [
      { idItem: 1, quantity: 1 },
      { idItem: 2, quantity: 1 },
      { idItem: 3, quantity: 3 },
    ],
    coupon: "VALE20",
    issueDate: new Date("2021-02-19"),
  };

  await placeOrder.execute(placeOrderInput);

  const item1 = await getStock.execute(1);
  expect(item1).toBe(-1);
  const item2 = await getStock.execute(2);
  expect(item2).toBe(-1);
  const item3 = await getStock.execute(3);
  expect(item3).toBe(-3);
});

afterAll(async () => {
  await connection.close();
});
