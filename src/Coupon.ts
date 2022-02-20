export class Coupon {
  constructor(
    readonly name: string,
    readonly percentage: number,
    readonly expireDate?: Date
  ) {}

  get isValid() {
    if (!this.expireDate) return true;
  }
}
