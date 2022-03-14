import { Dimension } from "./Dimension"
import { Item } from "./Item"

test("should create item with dimension", () => {
  const item = new Item(1, 'Music', 'Guitar', 1000, new Dimension(100, 30, 10))

  expect(item.volume).toBe(0.03)
})

test("should create item with density", () => {
  const item = new Item(1, 'Music', 'Guitar', 1000, new Dimension(100, 30, 10), 3)

  expect(item.density).toBe(100)
})

test("Should create an item without dimensions and weight", () => {
  const item = new Item(1, 'Music', 'Guitar', 1000)

  expect(item.density).toBe(0)
  expect(item.volume).toBe(0)
})

test("Should throw if invalid weight is passed", () => {
  expect(() => new Item(1, 'Music', 'Guitar', 1000, undefined, -10)).toThrow()
})
