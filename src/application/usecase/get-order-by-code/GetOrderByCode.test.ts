import { Order } from "../../../domain/entity/Order"
import OrderRepositoryMemory from "../../../infra/repository/memory/OrderRepositoryMemory"
import { GetOrderByCode } from "./GetOrderByCode"

test("should get order by code", async () => {
  const orderRepository = new OrderRepositoryMemory()
  const getOrderByCode = new GetOrderByCode(orderRepository)
  orderRepository.save(new Order('46996189870', 1, new Date('2021-10-21')))

  const order = await getOrderByCode.execute('202100000001')

  expect(order?.code).toBe('202100000001')
})

test("should return undefined when order not found", async () => {
  const orderRepository = new OrderRepositoryMemory()
  const getOrderByCode = new GetOrderByCode(orderRepository)

  const order = await getOrderByCode.execute('202100000001')

  expect(order).toBe(undefined)
})
