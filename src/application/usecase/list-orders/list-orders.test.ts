import { Order } from "../../../domain/entity/Order"
import OrderRepositoryMemory from "../../../infra/repository/memory/OrderRepositoryMemory"
import { ListOrders } from "./list-orders"

test('should get a list of orders', async () => {
  const orderRepository = new OrderRepositoryMemory()
  const listOrder = new ListOrders(orderRepository)
  orderRepository.save(new Order('46996189870', 1, new Date('2021-10-21')))
  orderRepository.save(new Order('46996189870', 2, new Date('2021-10-21')))

  const orders = await listOrder.execute()

  expect(orders.length).toBe(2)
})
