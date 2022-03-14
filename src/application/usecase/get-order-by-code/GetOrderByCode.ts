import { OrderRepository } from "../../../domain/repository/OrderRepository";
import { GetOrderByCodeOutput } from "./GetOrderByCodeOutput";

export class GetOrderByCode {
  constructor(readonly orderRepository: OrderRepository) { }

  async execute(code: string) {
    const order = await this.orderRepository.getByCode(code)
    if (!order) return undefined
    return new GetOrderByCodeOutput(order.code.value)
  }
}
