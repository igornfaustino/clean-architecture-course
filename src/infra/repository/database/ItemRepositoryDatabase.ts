import { Dimension } from "../../../domain/entity/Dimension";
import { Item } from "../../../domain/entity/Item";
import { ItemRepository } from "../../../domain/repository/ItemRepository";
import { Connection } from "../../database/Connection";

export default class ItemRepositoryDatabase implements ItemRepository {

	constructor (readonly connection: Connection) {
	}

	async getById(idItem: number): Promise<Item | undefined> {
		const [itemData] = await this.connection.query("select * from ccca.item where id = $1", [idItem]);
		const item = new Item(itemData.id, itemData.category, itemData.description, parseFloat(itemData.price), new Dimension(itemData.width, itemData.height, itemData.length), itemData.weight);
		return item;
	}
}
