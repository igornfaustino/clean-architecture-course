import { Connection } from "../../database/Connection";
import PostgreSQLConnectionAdapter from "../../database/PostgreSQLConnectionAdapter";
import ItemRepositoryDatabase from "./ItemRepositoryDatabase";

let connection: Connection;

beforeEach(function () {
	connection = new PostgreSQLConnectionAdapter();
});

test("Deve testar o repositório de item", async function () {
	const itemRepository = new ItemRepositoryDatabase(connection);
	const item = await itemRepository.getById(1);
	expect(item?.description).toBe("Guitarra");
});

afterEach(async function () {
	await connection.close();
});
