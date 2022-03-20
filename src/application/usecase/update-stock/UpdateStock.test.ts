import StockItemRepositoryMemory from "../../../infra/repository/memory/StockRepositoryMemory"
import { UpdateStock } from "./UpdateStock"

describe(UpdateStock.name, () => {
  test("should increase stock", async () => {
    const stockItemRepo = new StockItemRepositoryMemory()
    const updateStock = new UpdateStock(stockItemRepo)

    const { total } = await updateStock.execute(1, 'restock', 4)

    expect(total).toBe(14)
  })

  test("should decrease stock", async () => {
    const stockItemRepo = new StockItemRepositoryMemory()
    const updateStock = new UpdateStock(stockItemRepo)

    const { total } = await updateStock.execute(1, 'sell', 4)

    expect(total).toBe(6)
  })

  test("should throw when item not found", async () => {
    const stockItemRepo = new StockItemRepositoryMemory()
    const updateStock = new UpdateStock(stockItemRepo)

    const promise = updateStock.execute(2, 'sell', 4)

    await expect(promise).rejects.toThrow()
  })
})
