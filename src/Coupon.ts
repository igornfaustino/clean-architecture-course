export class Coupon {
  constructor(
    readonly name: string,
    readonly percentage: number,
    readonly expireDate?: Date
  ) { }

  isExpired() {
    if (!this.expireDate) return false;
    const now = new Date();
    return now > this.expireDate;
  }
}
