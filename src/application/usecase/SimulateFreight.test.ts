import CouponRepositoryMemory from "../../infra/repository/memory/CouponRepositoryMemory";
import ItemRepositoryMemory from "../../infra/repository/memory/ItemRepositoryMemory";
import OrderRepositoryMemory from "../../infra/repository/memory/OrderRepositoryMemory";
import { PlaceOrder } from "./PlaceOrder";
import { SimulateFreight } from "./SimulateFreight";

test("Should simulate freight", async () => {
  const itemRepository = new ItemRepositoryMemory()
  const simulateFreight = new SimulateFreight(itemRepository);
  const placeOrderInput = {
    orderItems: [
      { idItem: 1, quantity: 2 },
    ],
    distance: 1000
  }

  const output = await simulateFreight.execute(placeOrderInput)

  expect(output.total).toBe(60)
})
