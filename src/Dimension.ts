export class Dimension {
  readonly volume: number;
  readonly density: number;

  constructor(
    readonly width: number,
    readonly height: number,
    readonly length: number,
    readonly weight: number
  ) {
    this.volume = width * height * length;
    this.density = weight / this.volume;
  }

  get shippingDimension() {
    return (this.density / 100) * this.volume;
  }
}
