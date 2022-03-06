import { Coupon } from "./Coupon";

describe("Coupon", () => {
  test("should be valid if no expireDate", () => {
    const coupon = new Coupon("ANY_NAME", 20);

    expect(coupon.isExpired()).toBe(false);
  });

  test("should be valid if now is before expireDate", () => {
    const coupon = new Coupon("ANY_NAME", 20, new Date("2022-02-20"));

    expect(coupon.isExpired(new Date("2020-02-02"))).toBe(false);
  });

  test("should be valid if now is the same as expireDate", () => {
    const coupon = new Coupon("ANY_NAME", 20, new Date("2022-02-20"));

    expect(coupon.isExpired(new Date("2020-02-20"))).toBe(false);
  });

  test("should be invalid if now is after expireDate", () => {
    const coupon = new Coupon("ANY_NAME", 20, new Date("2022-02-20"));

    expect(coupon.isExpired(new Date("2022-02-21"))).toBe(true);
  });

  test("should calculate discount", () => {
    const coupon = new Coupon("ANY_NAME", 20);

    expect(coupon.calculateDiscount(100)).toBe(20);
  });
});
