/**
 * @typedef {import('../entities/Product.js').Product} Product
 * @typedef {import('../repositories/ProductRepository.js').ProductRepository} ProductRepository
 */

/**
 * Cas d'usage : Lister tous les produits
 * Orchestre l'accès aux données via le repository
 */
export class ListProductsUseCase {
  /**
   * @param {ProductRepository} productRepository
   */
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  /**
   * Retourne tous les produits
   * @returns {Promise<Product[]>}
   */
  async execute() {
    return this.productRepository.list();
  }
}
