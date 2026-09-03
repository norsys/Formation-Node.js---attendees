import { DomainError } from './DomainError.js';

export class InvalidProductDescriptionError extends DomainError {
  constructor() {
    super('Product description must be a non-empty string', 'INVALID_PRODUCT_DESCRIPTION');
  }
}
