import { MemoryRepositoryFactory } from "../../../infra/factory/MemoryRepositoryFactory";
import { PlaceOrder } from "./PlaceOrder";

const setup = () => {
  const repositoryFactory = new MemoryRepositoryFactory();
  const placeOrder = new PlaceOrder(repositoryFactory);
  return { placeOrder }
}

test("Should place an order", async () => {
  const { placeOrder } = setup();
  const placeOrderInput = {
    cpf: '935.411.347-80',
    orderItems: [
      { idItem: 1, quantity: 1 },
      { idItem: 2, quantity: 1 },
      { idItem: 3, quantity: 3 }
    ],
    coupon: "OFF20"
  }

  const output = await placeOrder.execute(placeOrderInput)

  expect(output.total).toBe(5132)
})

test("Should create an order", async () => {
  const { placeOrder } = setup();
  const placeOrderInput = {
    cpf: '935.411.347-80',
    orderItems: [
      { idItem: 1, quantity: 1 },
      { idItem: 2, quantity: 1 },
      { idItem: 3, quantity: 3 }
    ],
    coupon: "OFF20",
    issueDate: new Date('2021-02-19')
  }

  await placeOrder.execute(placeOrderInput)
  const output = await placeOrder.execute(placeOrderInput)

  expect(output.code).toBe('202100000002')
})
