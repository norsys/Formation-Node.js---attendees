import { DomainError } from './DomainError.js';

export class InsufficientStockError extends DomainError {
  constructor(availableQuantity, requestedQuantity) {
    super(
      `Insufficient stock (${availableQuantity} available, ${requestedQuantity} requested)`,
      'INSUFFICIENT_STOCK',
    );
    this.availableQuantity = availableQuantity;
    this.requestedQuantity = requestedQuantity;
  }
}
