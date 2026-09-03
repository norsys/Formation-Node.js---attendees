import { DomainError } from './DomainError.js';

export class InvalidProductStockError extends DomainError {
  constructor(message = 'Product stock must be a non-negative integer') {
    super(message, 'INVALID_PRODUCT_STOCK');
  }
}
