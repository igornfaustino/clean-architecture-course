import { StockItem } from "./StockItem";

describe(StockItem.name, () => {
  test("should increase stock", () => {
    const item = new StockItem(1, 10)

    item.increase(3)

    expect(item.getQuantity()).toBe(13)
  })

  test("should decrease stock", () => {
    const item = new StockItem(1, 10)

    item.decrease(3)

    expect(item.getQuantity()).toBe(7)
  })

  test("should throw when stock is bellow 0", () => {
    const item = new StockItem(1, 10)

    expect(() => item.decrease(11)).toThrow()
  })
})
