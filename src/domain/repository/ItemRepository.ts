import { Item } from "../entity/Item";

export interface ItemRepository {
  getById(id: number): Promise<Item | undefined>
}
