import { Coupon } from "./Coupon";

describe("Coupon", () => {
  test("should be valid if no expireDate", () => {
    const coupon = new Coupon("ANY_NAME", 20);

    expect(coupon.isValid).toBe(true);
  });

  test("should be valid if now is before expireDate", () => {
    const coupon = new Coupon("ANY_NAME", 20, new Date("2022-02-20"));
    jest.useFakeTimers().setSystemTime(new Date("2020-02-02"));

    expect(coupon.isValid).toBe(true);
  });

  test("should be valid if now is the same as expireDate", () => {
    const coupon = new Coupon("ANY_NAME", 20, new Date("2022-02-20"));
    jest.useFakeTimers().setSystemTime(new Date("2020-02-20"));

    expect(coupon.isValid).toBe(true);
  });

  test("should be invalid if now is after expireDate", () => {
    const coupon = new Coupon("ANY_NAME", 20, new Date("2022-02-20"));
    jest.useFakeTimers().setSystemTime(new Date("2022-02-21"));

    expect(coupon.isValid).toBe(false);
  });
});
