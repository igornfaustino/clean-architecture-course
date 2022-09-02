import { Order } from "../entity/Order";
import { DomainEvents } from "./DomainEvents";

export class OrderPlaced implements DomainEvents {
  name = "OrderPlaced";

  constructor(readonly order: Order) {}
}
