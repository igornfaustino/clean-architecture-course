import { Coupon } from "../../../domain/entity/Coupon";
import { CouponRepository } from "../../../domain/repository/CouponRepository";

export default class CouponRepositoryMemory implements CouponRepository {
  coupons: Coupon[];

  constructor() {
    this.coupons = [
      new Coupon("OFF20", 20)
    ];
  }

  async getByCode(code: string) {
    return this.coupons.find(coupon => coupon.code === code);
  }
}
