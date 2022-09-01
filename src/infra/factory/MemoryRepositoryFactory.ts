import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import { CouponRepository } from "../../domain/repository/CouponRepository";
import { ItemRepository } from "../../domain/repository/ItemRepository";
import { OrderRepository } from "../../domain/repository/OrderRepository";
import { StockEntryRepository } from "../../domain/repository/StockItemRepository";
import CouponRepositoryMemory from "../repository/memory/CouponRepositoryMemory";
import ItemRepositoryMemory from "../repository/memory/ItemRepositoryMemory";
import OrderRepositoryMemory from "../repository/memory/OrderRepositoryMemory";
import StockEntryRepositoryMemory from "../repository/memory/StockEntryRepositoryMemory";

export class MemoryRepositoryFactory implements RepositoryFactory {
  createStockEntryRepository(): StockEntryRepository {
    return new StockEntryRepositoryMemory();
  }

  createItemRepository(): ItemRepository {
    return new ItemRepositoryMemory();
  }

  createCouponRepository(): CouponRepository {
    return new CouponRepositoryMemory();
  }

  createOrderRepository(): OrderRepository {
    return new OrderRepositoryMemory();
  }
}
