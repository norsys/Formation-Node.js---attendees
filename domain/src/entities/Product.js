import {
  InsufficientStockError,
  InvalidProductDescriptionError,
  InvalidProductIdError,
  InvalidProductStockError,
  InvalidQuantityError,
} from '../errors/index.js';

/**
 * Entité Product (immutable)
 * Représente un produit automobile dans le système de gestion de stock
 * @typedef {Object} Product
 * @property {string} id - Numéro de produit (ex: "PNEU-001")
 * @property {string} description - Description du produit
 * @property {number} stock - Quantité en stock
 * @property {Date} updatedAt - Date de dernière mise à jour
 */
export class Product {
  /**
   * @param {string} id
   * @param {string} description
   * @param {number} stock
   * @param {Date} [updatedAt=new Date()]
   */
  constructor(id, description, stock, updatedAt = new Date()) {
    if (typeof id !== 'string' || id.trim() === '') {
      throw new InvalidProductIdError();
    }
    if (typeof description !== 'string' || description.trim() === '') {
      throw new InvalidProductDescriptionError();
    }
    if (typeof stock !== 'number' || stock < 0 || !Number.isInteger(stock)) {
      throw new InvalidProductStockError();
    }
    
    this.id = id;
    this.description = description;
    this.stock = stock;
    this.updatedAt = updatedAt;
  }

  /**
   * Crée une nouvelle instance avec un stock mis à jour
   * @param {number} newStock
   * @returns {Product}
   * @throws {InvalidProductStockError} Si le nouveau stock est negactif ou n'est pas un entier
   */
  withStock(newStock) {
    if (!Number.isInteger(newStock) || newStock < 0) {
      throw new InvalidProductStockError('Stock cannot be negative');
    }
    return new Product(this.id, this.description, newStock, new Date());
  }

  /**
   * Réapprovisionne le produit
   * @param {number} quantity - Quantité à ajouter
   * @returns {Product} Nouvelle instance avec stock mis à jour
   * @throws {InvalidQuantityError} Si la quantité n'est pas positive ou n'est pas un entier
   */
  restock(quantity) {
    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new InvalidQuantityError();
    }
    return this.withStock(this.stock + quantity);
  }

  /**
   * Utilise une quantité du produit
   * @param {number} quantity - Quantité à utiliser
   * @returns {Product} Nouvelle instance avec stock mis à jour
   * @throws {InvalidQuantityError} Si la quantité n'est pas un entier ou n'est pas positived
   * @throws {InsufficientStockError} Si le stock est insuffisant
   */
  use(quantity) {
    if (quantity <= 0 || !Number.isInteger(quantity)) {
      throw new InvalidQuantityError();
    }
    if (this.stock < quantity) {
      throw new InsufficientStockError(this.stock, quantity);
    }
    return this.withStock(this.stock - quantity);
  }
}
