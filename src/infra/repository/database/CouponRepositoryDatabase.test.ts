import { Connection } from "../../database/Connection";
import PostgreSQLConnectionAdapter from "../../database/PostgreSQLConnectionAdapter";
import CouponRepositoryDatabase from "./CouponRepositoryDatabase";

let connection: Connection;

beforeEach(function () {
	connection = new PostgreSQLConnectionAdapter();
});

test("Should fetch coupon info from database", async function () {
	const couponRepository = new CouponRepositoryDatabase(connection);
	const coupon = await couponRepository.getByCode("VALE20");
	expect(coupon?.percentage).toBe(20);
});

afterEach(async function () {
	await connection.close();
});
