import { Order } from "../../domain/entity/Order";
import { CouponRepository } from "../../domain/repository/CouponRepository";
import { ItemRepository } from "../../domain/repository/ItemRepository";
import { OrderRepository } from "../../domain/repository/OrderRepository";
import PlaceOrderInput from "./PlaceOrderInput";
import { PlaceOrderOutput } from "./PlaceOrderOutput";

export class PlaceOrder {
  constructor(
    readonly itemRepository: ItemRepository,
    readonly couponRepository: CouponRepository,
    readonly orderRepository: OrderRepository
  ) { }

  async execute(input: PlaceOrderInput) {
    const sequence = await this.orderRepository.count() + 1
    const order = new Order(input.cpf, sequence, input.issueDate)
    for (const { idItem, quantity } of input.orderItems) {
      const item = await this.itemRepository.getById(idItem)
      if (!item) throw new Error("Item not found");
      order.addItem(item, quantity);
    }
    if (input.coupon) {
      const coupon = await this.couponRepository.getByCode(input.coupon)
      if (coupon) order.addCoupon(coupon);
    }
    this.orderRepository.save(order)
    const total = order.getTotal()
    const output = new PlaceOrderOutput(total, order.code.value)
    return output
  }
}
