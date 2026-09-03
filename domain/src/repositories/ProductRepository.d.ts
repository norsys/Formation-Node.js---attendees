import type { Product } from '../entities/Product.js';

export interface ProductRepository {
  getById(id: string): Promise<Product | null>;
  update(product: Product): Promise<void>;
  list(): Promise<Product[]>;
}