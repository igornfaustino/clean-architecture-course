export class Coupon {
  constructor(
    readonly name: string,
    readonly percentage: number,
    readonly expireDate?: Date
  ) { }

  isExpired(today: Date = new Date()) {
    if (!this.expireDate) return false;
    return this.expireDate.getTime() < today.getTime();
  }
}
