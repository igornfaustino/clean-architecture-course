import { Dimension } from "./Dimension"

test('should calculate volume', () => {
  const dimension = new Dimension(100, 30, 10)

  expect(dimension.volume).toBe(0.03)
})
