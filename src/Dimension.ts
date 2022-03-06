export class Dimension {

  constructor(
    readonly width: number,
    readonly height: number,
    readonly length: number,
  ) {
  }

  get volume() {
    return this.width / 100 * this.height / 100 * this.length / 100;
  }
}
