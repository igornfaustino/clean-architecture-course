export class Dimension {

  constructor(
    readonly width: number,
    readonly height: number,
    readonly length: number,
  ) {
    if (width < 0) throw new Error('invalid width')
    if (height < 0) throw new Error('invalid height')
    if (length < 0) throw new Error('invalid length')
  }

  get volume() {
    return this.width / 100 * this.height / 100 * this.length / 100;
  }
}
