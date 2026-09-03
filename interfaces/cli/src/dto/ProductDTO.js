/**
 * DTO spécifique à l'interface CLI
 * Adaptateur pour afficher les produits dans le terminal
 * @typedef {Object} ProductDTO
 * @property {string} id - Numéro de produit
 * @property {string} description - Description du produit
 * @property {number} stock - Quantité en stock
 * @property {string} updatedAt - Date de dernière MAJ (format lisible)
 */

/**
 * Convertit une entité Product (domain) en DTO pour la CLI
 * @param {import('../../../../domain/entities/Product.js').Product} product
 * @returns {ProductDTO}
 */
export function productToDTO(product) {
  return {
    id: product.id,
    description: product.description,
    stock: product.stock,
    updatedAt: product.updatedAt.toLocaleString('fr-FR'),
  };
}
