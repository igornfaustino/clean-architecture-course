import { Order } from "../../../domain/entity/Order";
import { OrderPlaced } from "../../../domain/event/OrderPlaced";
import RepositoryFactory from "../../../domain/factory/RepositoryFactory";
import { CouponRepository } from "../../../domain/repository/CouponRepository";
import { ItemRepository } from "../../../domain/repository/ItemRepository";
import { OrderRepository } from "../../../domain/repository/OrderRepository";
import { StockEntryRepository } from "../../../domain/repository/StockItemRepository";
import Mediator from "../../../infra/mediator/Mediator";
import PlaceOrderInput from "./PlaceOrderInput";
import { PlaceOrderOutput } from "./PlaceOrderOutput";

export class PlaceOrder {
  readonly itemRepository: ItemRepository;
  readonly couponRepository: CouponRepository;
  readonly orderRepository: OrderRepository;
  readonly stockEntryRepository: StockEntryRepository;

  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly mediator: Mediator = new Mediator()
  ) {
    this.couponRepository = repositoryFactory.createCouponRepository();
    this.itemRepository = repositoryFactory.createItemRepository();
    this.orderRepository = repositoryFactory.createOrderRepository();
    this.stockEntryRepository = repositoryFactory.createStockEntryRepository();
  }

  async execute(input: PlaceOrderInput) {
    const sequence = (await this.orderRepository.count()) + 1;
    const order = new Order(input.cpf, sequence, input.issueDate);
    for (const { idItem, quantity } of input.orderItems) {
      const item = await this.itemRepository.getById(idItem);
      if (!item) throw new Error("Item not found");
      order.addItem(item, quantity);
    }
    if (input.coupon) {
      const coupon = await this.couponRepository.getByCode(input.coupon);
      if (coupon) order.addCoupon(coupon);
    }
    await this.orderRepository.save(order);
    const total = order.getTotal();
    this.mediator.publish(new OrderPlaced(order));
    const output = new PlaceOrderOutput(total, order.code.value);
    return output;
  }
}
