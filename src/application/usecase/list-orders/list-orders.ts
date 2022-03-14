import { OrderRepository } from "../../../domain/repository/OrderRepository";

export class ListOrders {
  constructor(private readonly orderRepository: OrderRepository) { }

  async execute() {
    return this.orderRepository.list()
  }
}
