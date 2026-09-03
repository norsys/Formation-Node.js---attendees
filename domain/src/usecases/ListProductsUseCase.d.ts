import type { Product } from '../entities/Product.js';
import type { ProductRepository } from '../repositories/ProductRepository.js';

export declare class ListProductsUseCase {
  constructor(productRepository: ProductRepository);

  execute(): Promise<Product[]>;
}