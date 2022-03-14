import { Dimension } from "./Dimension"

test('should calculate volume', () => {
  const dimension = new Dimension(100, 30, 10)

  expect(dimension.volume).toBe(0.03)
})

test.each([
  [-100, 30, 10],
  [100, -30, 10],
  [100, 30, -10]
])('should throw if dimension is negative', (width, height, length) => {

  expect(() => new Dimension(width, height, length)).toThrow()
})
