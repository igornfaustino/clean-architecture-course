import { StockEntry } from "../../domain/entity/StockEntry";
import { OrderPlaced } from "../../domain/event/OrderPlaced";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import { StockEntryRepository } from "../../domain/repository/StockItemRepository";
import Handler from "./Handler";

export class StockEntryHandler implements Handler {
  name = "OrderPlaced";
  stockEntryRepository: StockEntryRepository;

  constructor(readonly repositoryFactory: RepositoryFactory) {
    this.stockEntryRepository = repositoryFactory.createStockEntryRepository();
  }

  async handler(event: OrderPlaced): Promise<void> {
    for (const { idItem, quantity } of event.order.items) {
      await this.stockEntryRepository.save(
        new StockEntry(idItem, "out", quantity)
      );
    }
  }
}
