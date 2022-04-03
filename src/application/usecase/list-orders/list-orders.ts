import RepositoryFactory from "../../../domain/factory/RepositoryFactory";
import { ItemRepository } from "../../../domain/repository/ItemRepository";
import { OrderRepository } from "../../../domain/repository/OrderRepository";
import { GetOrderOutput } from "../get-order-by-code/GetOrderByCodeOutput";

export class ListOrders {
  orderRepository: OrderRepository;
  itemRepository: ItemRepository;

  constructor(readonly repositoryFactory: RepositoryFactory) {
    this.orderRepository = repositoryFactory.createOrderRepository();
    this.itemRepository = repositoryFactory.createItemRepository();
  }

  async execute() {
    const orders = await this.orderRepository.getAll()
    const output: GetOrderOutput[] = [];
    for (const order of orders) {
      const items: { description: string, price: number }[] = [];
      for (const orderItem of order.items) {
        const item = await this.itemRepository.getById(orderItem.idItem);
        if (!item) throw new Error("Item not found");
        items.push({ description: item.description, price: orderItem.price });
      }
      output.push(new GetOrderOutput(order.code.value, order.getTotal(), items));
    }
    return output;
  }
}
