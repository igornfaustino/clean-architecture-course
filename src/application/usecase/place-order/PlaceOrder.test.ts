import { Connection } from "../../../infra/database/Connection";
import PostgreSQLConnectionAdapter from "../../../infra/database/PostgreSQLConnectionAdapter";
import { DatabaseRepositoryFactory } from "../../../infra/factory/DatabaseRepositoryFactory";
import { PlaceOrder } from "./PlaceOrder";

let connection: Connection;

const setup = (connection: Connection) => {
  const repositoryFactory = new DatabaseRepositoryFactory(connection);
  const placeOrder = new PlaceOrder(repositoryFactory);
  const orderRepository = repositoryFactory.createOrderRepository();
  return { placeOrder, orderRepository };
};

beforeEach(async function () {
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

afterEach(async () => {
  await connection.close();
});
