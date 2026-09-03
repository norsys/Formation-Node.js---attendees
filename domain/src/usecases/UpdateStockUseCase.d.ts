import type { Product } from '../entities/Product.js';
import type {
  InvalidActionError,
  InvalidProductIdError,
  InvalidQuantityError,
  ProductNotFoundError,
} from '../errors/index.js';
import type { ProductRepository } from '../repositories/ProductRepository.js';

export type StockAction = 'restock' | 'use';

export declare class UpdateStockUseCase {
  constructor(productRepository: ProductRepository);

  /**
   * @throws {InvalidProductIdError}
   * @throws {InvalidActionError}
   * @throws {InvalidQuantityError}
   * @throws {ProductNotFoundError}
   */
  execute(productId: string, action: StockAction, quantity: number): Promise<Product>;
}