/**
 * @typedef {import('../entities/Product.js').Product} Product
 * @typedef {import('../repositories/ProductRepository.js').ProductRepository} ProductRepository
 */

import {
  InvalidActionError,
  InvalidProductIdError,
  InvalidQuantityError,
  ProductNotFoundError,
} from '../errors/index.js';

/**
 * Cas d'usage : Mettre à jour le stock d'un produit
 * Orchestre la logique métier (délaguée à Product) et la persistance
 */
export class UpdateStockUseCase {
  /**
   * @param {ProductRepository} productRepository
   */
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  /**
   * Met à jour le stock d'un produit
   * @param {string} productId
   * @param {'restock'|'use'} action
   * @param {number} quantity
   * @returns {Promise<Product>}
   */
  async execute(productId, action, quantity) {
    if (typeof productId !== 'string' || productId.trim() === '') {
      throw new InvalidProductIdError();
    }
    if (action !== 'restock' && action !== 'use') {
      throw new InvalidActionError();
    }
    if (typeof quantity !== 'number' || quantity <= 0 || !Number.isInteger(quantity)) {
      throw new InvalidQuantityError();
    }

    const product = await this.productRepository.getById(productId);
    if (!product) {
      throw new ProductNotFoundError(productId);
    }

    const updatedProduct = action === 'restock'
      ? product.restock(quantity)
      : product.use(quantity);

    await this.productRepository.update(updatedProduct);
    return updatedProduct;
  }
}
