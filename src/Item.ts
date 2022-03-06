import { Dimension } from "./Dimension";

export class Item {
  constructor(
    readonly id: number,
    readonly category: string,
    readonly description: string,
    readonly price: number,
    readonly dimensions?: Dimension,
    readonly weight?: number
  ) { }

  get volume() {
    return this.dimensions?.volume || 0
  }

  get density() {
    if (this.weight && this.volume) return this.weight / this.volume
    return 0
  }
}
