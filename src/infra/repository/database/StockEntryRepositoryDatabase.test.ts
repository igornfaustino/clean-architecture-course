import { StockEntry } from "../../../domain/entity/StockEntry";
import { Connection } from "../../database/Connection";
import PostgreSQLConnectionAdapter from "../../database/PostgreSQLConnectionAdapter";
import { StockEntryRepositoryDatabase } from "./StockEntryRepositoryDatabase";

let connection: Connection;

beforeEach(async function () {
  connection = new PostgreSQLConnectionAdapter();
});

test("Should persist an entry on stock", async function () {
  const stockEntryRepository = new StockEntryRepositoryDatabase(connection);
  await stockEntryRepository.clean();

  await stockEntryRepository.save(new StockEntry(1, "in", 6));
  await stockEntryRepository.save(new StockEntry(1, "out", 2));
  await stockEntryRepository.save(new StockEntry(1, "in", 2));

  const stockEntries = await stockEntryRepository.getAll(1);
  expect(stockEntries).toHaveLength(3);
});

afterEach(async function () {
  await connection.close();
});
