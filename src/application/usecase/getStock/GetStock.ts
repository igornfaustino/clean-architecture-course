import RepositoryFactory from "../../../domain/factory/RepositoryFactory";
import { StockEntryRepository } from "../../../domain/repository/StockItemRepository";
import { StockCalculator } from "../../../domain/services/StockCalculator";

export class GetStock {
  stockEntryRepository: StockEntryRepository;

  constructor(readonly repositoryFactory: RepositoryFactory) {
    this.stockEntryRepository =
      this.repositoryFactory.createStockEntryRepository();
  }

  async execute(idItem: number): Promise<number> {
    const stockEntries = await this.stockEntryRepository.getAll(idItem);
    const calculate = new StockCalculator();
    return calculate.calculate(stockEntries);
  }
}
