import { Dimension } from "./Dimension"

test('should calculate volume', () => {
  const dimension = new Dimension(100, 30, 10)

  expect(dimension.volume).toBe(0.03)
})

test.each([
  [-100, 30, 10, 'width'],
  [100, -30, 10, 'height'],
  [100, 30, -10, 'length']
])('should throw if dimension is negative', (width, height, length, field) => {
  expect(() => new Dimension(width, height, length)).toThrow(new Error(`invalid ${field}`))
})
