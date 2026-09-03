import type { Product } from '../entities/Product.js';
import type {
  InvalidProductIdError,
  ProductNotFoundError,
} from '../errors/index.js';
import type { ProductRepository } from '../repositories/ProductRepository.js';

export declare class GetProductUseCase {
  constructor(productRepository: ProductRepository);

  /**
   * @throws {InvalidProductIdError}
   * @throws {ProductNotFoundError}
   */
  execute(productId: string): Promise<Product>;
}