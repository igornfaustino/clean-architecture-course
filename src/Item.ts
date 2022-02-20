import { Dimension } from "./Dimension";

export class Item {
  constructor(
    readonly id: number,
    readonly category: string,
    readonly description: string,
    readonly price: number,
    readonly dimensions: Dimension
  ) {}
}
