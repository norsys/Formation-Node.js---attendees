/**
 * @typedef {import('../entities/Product.js').Product} Product
 */

/**
 * Interface du Repository (Port)
 * Définit le contrat pour la persistance des produits
 * @interface
 */
export class ProductRepository {
  /**
   * Récupère un produit par son ID
   * @param {string} id
   * @returns {Promise<Product|null>}
   */
  async getById(id) {}

  /**
   * Met à jour un produit
   * @param {Product} product
   * @returns {Promise<void>}
   */
  async update(product) {}

  /**
   * Liste tous les produits
   * @returns {Promise<Product[]>}
   */
  async list() {}
}

export const PRODUCT_REPOSITORY = Symbol('PRODUCT_REPOSITORY');