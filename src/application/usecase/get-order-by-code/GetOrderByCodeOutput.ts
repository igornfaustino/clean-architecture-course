export class GetOrderOutput {
  constructor(readonly code: string, readonly total: number, readonly items: { description: string, price: number }[]) {
  }
}
