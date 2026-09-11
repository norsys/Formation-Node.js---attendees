import { readFile } from 'node:fs/promises';
import { createWriteStream } from 'node:fs';
import { Buffer } from 'node:buffer';
import { Product } from 'stock-management--domain/entities/Product.js';
import { ProductRepository } from 'stock-management--domain/repositories/ProductRepository.js';

/**
 * Implémentation concrète du ProductRepository pour un stockage JSON
 * Utilise les streams et buffers pour la lecture/écriture
 */
@Injectable()
export class JsonProductRepository extends ProductRepository {
  /**
   * @param {string} filePath
   */
  constructor(filePath = './data/products.json') {
    super();
    this.filePath = filePath;
    console.log(`loading from file ${this.filePath}`)
  }

  /**
   * Lit tous les produits depuis le fichier JSON
   * @returns {Promise<Product[]>}
   */
  async #readAllProducts() {
    try {
      const data = await readFile(this.filePath, 'utf-8');
      const products = JSON.parse(data);
      return products.map(
        (p) => new Product(p.id, p.description, p.stock, new Date(p.updatedAt))
      );
    } catch (error) {
      if (error.code === 'ENOENT') {
        // Fichier n'existe pas → créer avec des données par défaut
        const defaultProducts = [
          new Product('PNEU-001', 'Pneu Michelin 205/55 R16', 10),
          new Product('PNEU-002', 'Pneu Continental 195/65 R15', 5),
          new Product('ESSUIE-001', 'Balai d\'essuie-glace Bosch', 20),
          new Product('VIDANGE-001', 'Kit vidange 5W40', 15),
          new Product('FREIN-001', 'Plaquettes de frein Brembo', 8),
          new Product('BATTERIE-001', 'Batterie 12V 60Ah', 3),
        ];
        await this.#writeAllProducts(defaultProducts);
        return defaultProducts;
      }
      throw error;
    }
  }

  /**
   * Écrit tous les produits dans le fichier JSON via Stream + Buffer
   * @param {Product[]} products
   * @returns {Promise<void>}
   */
  async #writeAllProducts(products) {
    const data = JSON.stringify(
      products.map((p) => ({
        id: p.id,
        description: p.description,
        stock: p.stock,
        updatedAt: p.updatedAt.toISOString(),
      })),
      null,
      2
    );

    // Écriture via Stream + Buffer
    await new Promise((resolve, reject) => {
      const writeStream = createWriteStream(this.filePath);
      const buffer = Buffer.from(data, 'utf-8');

      writeStream.write(buffer);
      writeStream.end();
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });
  }

  /**
   * Récupère un produit par son ID
   * @param {string} id
   * @returns {Promise<Product|undefined>}
   */
  async getById(id) {
    const products = await this.#readAllProducts();
    return products.find((p) => p.id === id);
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
    const products = await this.#readAllProducts();
    const index = products.findIndex((p) => p.id === product.id);
    if (index === -1) {
      throw new Error(`Produit ${product.id} introuvable`);
    }

    products[index] = product;
    await this.#writeAllProducts(products);
  }
}
