import CouponRepositoryMemory from "../../infra/repository/memory/CouponRepositoryMemory";
import ItemRepositoryMemory from "../../infra/repository/memory/ItemRepositoryMemory";
import OrderRepositoryMemory from "../../infra/repository/memory/OrderRepositoryMemory";
import { PlaceOrder } from "./PlaceOrder";

test("Should place an order", async () => {
  const itemRepository = new ItemRepositoryMemory()
  const orderRepository = new OrderRepositoryMemory()
  const couponRepository = new CouponRepositoryMemory()
  const placeOrder = new PlaceOrder(itemRepository, couponRepository, orderRepository);
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
