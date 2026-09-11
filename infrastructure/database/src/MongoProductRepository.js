
import { ProductRepository } from 'stock-management--domain/repositories/ProductRepository.js';
import { MongoClient } from 'mongodb';
import { Product } from 'stock-management--domain/entities/Product.js'

/**
 * Implémentation concrète du ProductRepository pour un stockage JSON
 * Utilise les streams et buffers pour la lecture/écriture
 */
export class MongoProductRepository extends ProductRepository {


  /**
   * @param {string} filePath
   */
  constructor(filePath = './data/products.json') {
    super();
    this.filePath = filePath;
    this.client = new MongoClient('mongodb://localhost:27017');
    this.collection = this.client.db('stock_management').collection('products');
    console.log(`loading from file ${this.filePath}`)
  }
 /**
 * @param {WithId<any>} doc
 */
  #toProduct(doc) {
      const lastStock = doc.stockHistory.reduce((max, item) => item.recordedAt > max.recordedAt ? item : max);
      return new Product(doc._id.toString(), doc.description, lastStock.stock, lastStock.recordedAt);
  }

  /**
   * Lit tous les produits depuis le fichier JSON
   * @returns {Promise<Product[]>}
   */
  async #readAllProducts() {
      try {
        const rawProducts = await this.collection.find().toArray();
        const products = rawProducts.map(this.#toProduct);
        return products;
      } catch(e) {
        console.error(e);
      }
  }

  /**
   * Récupère un produit par son ID
   * @param {string} id
   * @returns {Promise<Product|undefined>}
   */
  async getById(id) {
    const product = await this.collection.findOne({_id: id})
    return product ? this.#toProduct(product) : null;
  }

  /**
   * Liste tous les produits
   * @returns {Promise<Product[]>}
   */
  async list() {
    return this.#readAllProducts();
  }

  /**
   * Met à jour un produit
   * @param {Product} product
   * @returns {Promise<void>}
   */
  async update(product) {
    const filter = { _id: product.id };
    const updateDoc = {
        $push: {
          stockHistory: { stock: product.stock, recordedAt: new Date() }
        }
      };
    await this.collection.updateOne(filter, updateDoc);
  }
}
