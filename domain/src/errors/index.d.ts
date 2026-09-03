export declare abstract class DomainError extends Error {
  readonly code: string;
  protected constructor(message: string, code: string);
}

export declare class InvalidProductIdError extends DomainError {
  constructor();
}

export declare class InvalidActionError extends DomainError {
  constructor();
}

export declare class InvalidQuantityError extends DomainError {
  constructor(message?: string);
}

export declare class ProductNotFoundError extends DomainError {
  readonly productReference: string;
  constructor(productReference: string);
}

export declare class InsufficientStockError extends DomainError {
  readonly availableQuantity: number;
  readonly requestedQuantity: number;
  constructor(availableQuantity: number, requestedQuantity: number);
}

export declare class InvalidProductDescriptionError extends DomainError {
  constructor();
}

export declare class InvalidProductStockError extends DomainError {
  constructor(message?: string);
}
