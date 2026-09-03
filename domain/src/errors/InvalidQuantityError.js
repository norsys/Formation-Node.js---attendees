import { DomainError } from './DomainError.js';

export class InvalidQuantityError extends DomainError {
  constructor(message = 'Quantity must be a positive integer') {
    super(message, 'INVALID_QUANTITY');
  }
}
