import { Dimension } from "./Dimension"
import { Freight } from "./Freight"
import { Item } from "./Item"

test('Should calculate freight based on distance', () => {
  const item = new Item(1, 'Music', 'Guitar', 1000, new Dimension(100, 30, 10), 3)
  const freight = new Freight()

  freight.addItem(item, 2)

  expect(freight.calculate(1000)).toBe(60)
})

test("should return total with min freight value", () => {
  const item = new Item(1, 'Music', 'Guitar', 1000, new Dimension(10, 10, 10), 0.9)
  const freight = new Freight();

  freight.addItem(item, 1);

  expect(freight.calculate(1000)).toBe(10);
});
