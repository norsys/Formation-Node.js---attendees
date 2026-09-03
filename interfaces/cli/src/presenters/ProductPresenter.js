/**
 * Presenter pour l'interface CLI
 * Responsable de la conversion Entité → DTO et de la présentation
 */
import { productToDTO } from '../dto/ProductDTO.js';

/**
 * Présente un produit pour affichage dans la CLI
 * @param {import('../../../../domain/entities/Product.js').Product} product
 * @returns {import('../dto/ProductDTO.js').ProductDTO}
 */
export function presentProduct(product) {
  return productToDTO(product);
}

/**
 * Formate un produit pour affichage détaillé dans le terminal
 * @param {import('../dto/ProductDTO.js').ProductDTO} productDTO
 * @returns {string}
 */
export function formatProductForDisplay(productDTO) {
  return `
--- Informations du produit ---
ID:          ${productDTO.id}
Description: ${productDTO.description}
Stock:       ${productDTO.stock} unités
Dernière MAJ: ${productDTO.updatedAt}
-------------------------------
`;
}
