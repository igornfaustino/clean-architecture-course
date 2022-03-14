import { Order } from "../../../domain/entity/Order";
import { OrderRepository } from "../../../domain/repository/OrderRepository";
import { Connection } from "../../database/Connection";

export default class OrderRepositoryDatabase implements OrderRepository {
	constructor (readonly connection: Connection) {}

	async save(order: Order): Promise<void> {
		await this.connection.query('insert into ccca.order(code, total, freight, coupon, cpf) values ($1, $2, $3, $4, $5)', 
		[
			order.code.value,
			order.getTotal(),
			order.freight.calculate(1000),
			order.coupon?.code,
			order.cpf.cpf
		])
		for (const orderItem of order.items) {
			await this.connection.query('insert into ccca.orderItem(orderId, itemId, quantity) values ($1, $2, $3)', 
			[
				order.code.value,
				orderItem.idItem,
				orderItem.quantity,
			])
		}
	}
	
	async count(): Promise<number> {
		const [{count}] = await this.connection.query('select count(distinct code) from ccca.order', []) 
		return parseInt(count)
	}
}
