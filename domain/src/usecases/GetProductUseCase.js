/**
 * @typedef {import('../entities/Product.js').Product} Product
 * @typedef {import('../repositories/ProductRepository.js').ProductRepository} ProductRepository
 */

import { InvalidProductIdError, ProductNotFoundError } from '../errors/index.js';

/**
 * Cas d'usage : Récupérer un produit
 * Orchestre l'accès aux données via le repository
 */
export class GetProductUseCase {
  /**
   * @param {ProductRepository} productRepository
   */
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  /**
   * Récupère un produit par son ID
   * @param {string} productId
   * @returns {Promise<Product>}
   */
  async execute(productId) {
    if (typeof productId !== 'string' || productId.trim() === '') {
      throw new InvalidProductIdError();
    }

    const product = await this.productRepository.getById(productId);
    if (!product) {
      throw new ProductNotFoundError(productId);
    }

    return product;
  }
}
