import { Freight } from "../../domain/entity/Freight";
import { ItemRepository } from "../../domain/repository/ItemRepository";
import SimulateFreightInput from "./SimulateFreightInput";
import SimulateFreightOutput from "./SimulateFreightOutput";

export class SimulateFreight {
  constructor(readonly itemRepository: ItemRepository) { }

  async execute(input: SimulateFreightInput) {
    const freight = new Freight()
    for (const { idItem, quantity } of input.orderItems) {
      const item = await this.itemRepository.getById(idItem)
      if (item) freight.addItem(item, quantity)
    }
    const total = freight.calculate(input.distance)
    return new SimulateFreightOutput(total)
  }
}
