import CouponRepositoryMemory from "../../infra/repository/memory/CouponRepositoryMemory"
import { ValidateCoupon } from "./ValidateCoupon"

test("should validate coupon", async () => {
  const couponRepo = new CouponRepositoryMemory()
  const validateCoupon = new ValidateCoupon(couponRepo)

  const isValid = await validateCoupon.execute('OFF20')

  expect(isValid).toBe(true)
})

test("should be invalid if coupon dont exist", async () => {
  const couponRepo = new CouponRepositoryMemory()
  const validateCoupon = new ValidateCoupon(couponRepo)

  const isValid = await validateCoupon.execute('any_coupon')

  expect(isValid).toBe(false)
})
