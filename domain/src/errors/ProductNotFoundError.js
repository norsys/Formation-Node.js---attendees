import { DomainError } from './DomainError.js';

export class ProductNotFoundError extends DomainError {
  constructor(productReference) {
    super(
      `No product corresponding to given reference: ${productReference}`,
      'PRODUCT_NOT_FOUND',
    );
    this.productReference = productReference;
  }
}
