import type {
  InsufficientStockError,
  InvalidProductDescriptionError,
  InvalidProductIdError,
  InvalidProductStockError,
  InvalidQuantityError,
} from '../errors/index.js';

export declare class Product {
  id: string;
  description: string;
  stock: number;
  updatedAt: Date;

  /**
   * @throws {InvalidProductIdError}
   * @throws {InvalidProductDescriptionError}
   * @throws {InvalidProductStockError}
   */
  constructor(id: string, description: string, stock: number, updatedAt?: Date);

  /** @throws {InvalidProductStockError} */
  withStock(newStock: number): Product;
  /** @throws {InvalidQuantityError} */
  restock(quantity: number): Product;
  /** @throws {InvalidQuantityError | InsufficientStockError} */
  use(quantity: number): Product;
}