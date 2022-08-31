import { StockEntry } from "../../../domain/entity/StockEntry";
import { StockEntryRepository } from "../../../domain/repository/StockItemRepository";
import { Connection } from "../../database/Connection";

export class StockEntryRepositoryDatabase implements StockEntryRepository {
  constructor(readonly connection: Connection) {}

  async save(stockEntry: StockEntry): Promise<void> {
    await this.connection.query(
      "insert into ccca.stock_entry (id_item, operation, quantity) values ($1, $2, $3)",
      [stockEntry.idItem, stockEntry.operation, stockEntry.quantity]
    );
  }

  async getAll(idItem: number): Promise<StockEntry[]> {
    const stockEntriesData = await this.connection.query(
      "select * from ccca.stock_entry where id_item = $1",
      [idItem]
    );
    const stockEntries: StockEntry[] = [];
    for (const stockEntryData of stockEntriesData) {
      stockEntries.push(
        new StockEntry(
          stockEntryData.id_item,
          stockEntryData.operation,
          stockEntryData.quantity
        )
      );
    }
    return stockEntries;
  }

  async clean(): Promise<void> {
    await this.connection.query("delete from ccca.stock_entry", []);
  }
}
