import { DomainError } from './DomainError.js';

export class InvalidProductIdError extends DomainError {
  constructor() {
    super('Product ID must be a valid string', 'INVALID_PRODUCT_ID');
  }
}
