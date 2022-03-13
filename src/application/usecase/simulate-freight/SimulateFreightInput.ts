export default class SimulateFreightInput {
  constructor(
    readonly orderItems: { idItem: number, quantity: number }[],
    readonly distance: number = 1000,
  ) { }
}
