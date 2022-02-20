export class Item {
  constructor(
    readonly id: number,
    readonly category: string,
    readonly description: string,
    readonly price: number,
    readonly width: number,
    readonly height: number,
    readonly length: number,
    readonly weight: number
  ) {}
}
