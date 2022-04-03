import { Order } from "../../../domain/entity/Order"
import { MemoryRepositoryFactory } from "../../../infra/factory/MemoryRepositoryFactory"
import { ListOrders } from "./list-orders"

test('should get a list of orders', async () => {
  const repositoryFactory = new MemoryRepositoryFactory()
  const listOrder = new ListOrders(repositoryFactory)
  listOrder.orderRepository.save(new Order('46996189870', 1, new Date('2021-10-21')))
  listOrder.orderRepository.save(new Order('46996189870', 2, new Date('2021-10-21')))

  const orders = await listOrder.execute()

  expect(orders.length).toBe(2)
})
