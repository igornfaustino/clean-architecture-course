import { CPF } from "./cpf";

test.each(["111.111.111-11", "123.456.789-99"])(
  "should return false for an invalid cpf: %s",
  (cpf) => {
    expect(() => new CPF(cpf)).toThrow();
  }
);

test("should return true for an valid cpf", () => {
  expect(new CPF("935.411.347-80").cpf).toBe("93541134780");
});

test("should throw if no cpf is passed", () => {
  expect(() => new CPF("")).toThrow();
});

test("should throw if wrong length cpf is passed", () => {
  expect(() => new CPF("123123")).toThrow();
});
