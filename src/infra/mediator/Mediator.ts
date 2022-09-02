import Handler from "../../application/handlers/Handler";
import { DomainEvents } from "../../domain/event/DomainEvents";

export default class Mediator {
  handlers: Handler[] = [];

  register(handler: Handler) {
    this.handlers.push(handler);
  }

  async publish(event: DomainEvents) {
    for (const handler of this.handlers) {
      if (handler.name === event.name) {
        await handler.handler(event);
      }
    }
  }
}
