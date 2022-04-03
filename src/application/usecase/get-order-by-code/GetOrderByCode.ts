import RepositoryFactory from "../../../domain/factory/RepositoryFactory";
import { ItemRepository } from "../../../domain/repository/ItemRepository";
import { OrderRepository } from "../../../domain/repository/OrderRepository";
import { GetOrderOutput } from "./GetOrderByCodeOutput";

export class GetOrderByCode {
  orderRepository: OrderRepository;
  itemRepository: ItemRepository;

  constructor(readonly repositoryFactory: RepositoryFactory) {
    this.orderRepository = repositoryFactory.createOrderRepository();
    this.itemRepository = repositoryFactory.createItemRepository();
  }

  async execute(code: string) {
    const order = await this.orderRepository.getByCode(code)
    if (!order) return undefined
    const items: { description: string, price: number }[] = [];
    for (const orderItem of order.items) {
      const item = await this.itemRepository.getById(orderItem.idItem);
      if (!item) throw new Error("Item not found");
      items.push({ description: item.description, price: orderItem.price });
    }
    return new GetOrderOutput(order.code.value, order.getTotal(), items);
  }
}
