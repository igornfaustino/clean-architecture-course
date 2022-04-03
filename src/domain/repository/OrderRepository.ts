import { Order } from "../entity/Order";

export interface OrderRepository {
  save(order: Order): Promise<void>
  count(): Promise<number>
  getByCode(code: string): Promise<Order | undefined>
  getAll(): Promise<Order[]>
}
