import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import { CouponRepository } from "../../domain/repository/CouponRepository";
import { ItemRepository } from "../../domain/repository/ItemRepository";
import { OrderRepository } from "../../domain/repository/OrderRepository";
import { StockEntryRepository } from "../../domain/repository/StockItemRepository";
import { Connection } from "../database/Connection";
import CouponRepositoryDatabase from "../repository/database/CouponRepositoryDatabase";
import ItemRepositoryDatabase from "../repository/database/ItemRepositoryDatabase";
import OrderRepositoryDatabase from "../repository/database/OrderRepositoryDatabase";
import { StockEntryRepositoryDatabase } from "../repository/database/StockEntryRepositoryDatabase";

export class DatabaseRepositoryFactory implements RepositoryFactory {
  constructor(private readonly connection: Connection) {}

  createStockEntryRepository(): StockEntryRepository {
    return new StockEntryRepositoryDatabase(this.connection);
  }

  createItemRepository(): ItemRepository {
    return new ItemRepositoryDatabase(this.connection);
  }

  createCouponRepository(): CouponRepository {
    return new CouponRepositoryDatabase(this.connection);
  }

  createOrderRepository(): OrderRepository {
    return new OrderRepositoryDatabase(this.connection);
  }
}
