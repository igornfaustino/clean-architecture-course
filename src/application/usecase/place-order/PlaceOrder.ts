import { Order } from "../../../domain/entity/Order";
import { StockEntry } from "../../../domain/entity/StockEntry";
import RepositoryFactory from "../../../domain/factory/RepositoryFactory";
import { CouponRepository } from "../../../domain/repository/CouponRepository";
import { ItemRepository } from "../../../domain/repository/ItemRepository";
import { OrderRepository } from "../../../domain/repository/OrderRepository";
import { StockEntryRepository } from "../../../domain/repository/StockItemRepository";
import PlaceOrderInput from "./PlaceOrderInput";
import { PlaceOrderOutput } from "./PlaceOrderOutput";

export class PlaceOrder {
  readonly itemRepository: ItemRepository;
  readonly couponRepository: CouponRepository;
  readonly orderRepository: OrderRepository;
  readonly stockEntryRepository: StockEntryRepository;

  constructor(readonly repositoryFactory: RepositoryFactory) {
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
    this.orderRepository.save(order);
    const total = order.getTotal();
    for (const { idItem, quantity } of input.orderItems) {
      await this.stockEntryRepository.save(
        new StockEntry(idItem, "out", quantity)
      );
    }
    const output = new PlaceOrderOutput(total, order.code.value);
    return output;
  }
}
