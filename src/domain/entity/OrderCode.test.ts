import { OrderCode } from "./OrderCode"

describe(OrderCode.name, () => {
  test("Should create an order code", () => {
    const date = new Date('2021-10-10')
    const sequence = 1
    const orderCode = new OrderCode(date, sequence)
    
    const code = orderCode.value

    expect(code).toBe('202100000001')
  })
})
