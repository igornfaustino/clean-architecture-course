import { Coupon } from "./Coupon";

describe("Coupon", () => {
  test("should be valid if no expireDate", () => {
    const coupon = new Coupon("ANY_NAME", 20);

    expect(coupon.isValid).toBe(true);
  });
});
