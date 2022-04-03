import { Order } from "../../../domain/entity/Order"
import { MemoryRepositoryFactory } from "../../../infra/factory/MemoryRepositoryFactory"
import { GetOrderByCode } from "./GetOrderByCode"

const setup = () => {
  const repositoryFactory = new MemoryRepositoryFactory()
  const getOrderByCode = new GetOrderByCode(repositoryFactory)
  return { getOrderByCode }
}

test("should get order by code", async () => {
  const { getOrderByCode } = setup()
  getOrderByCode.orderRepository.save(new Order('46996189870', 1, new Date('2021-10-21')))

  const order = await getOrderByCode.execute('202100000001')

  expect(order?.code).toBe('202100000001')
})

test("should return undefined when order not found", async () => {
  const { getOrderByCode } = setup()

  const order = await getOrderByCode.execute('202100000001')

  expect(order).toBe(undefined)
})
