import { DomainEvents } from "../../domain/event/DomainEvents";

export default interface Handler {
  name: string;
  handler(event: DomainEvents): Promise<void>;
}
