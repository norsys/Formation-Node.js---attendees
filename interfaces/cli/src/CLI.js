import { join } from 'node:path';
import readline from 'node:readline';
import { GetProductUseCase } from 'stock-management--domain/usecases/GetProductUseCase.js';
import { UpdateStockUseCase } from 'stock-management--domain/usecases/UpdateStockUseCase.js';
import { JsonProductRepository } from 'stock-management--file-persistance/JsonProductRepository.js';
import { exportProductsToCsv } from 'stock-management--file-persistance/exportProductsToCsv.js';
import { presentProduct, formatProductForDisplay } from './presenters/ProductPresenter.js';

/**
 * Interface CLI pour la gestion de stock
 * Point d'interaction avec l'utilisateur
 */
export class CLI {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    // Injection de dépendances (Dependency Injection)
    console.log("running from", process.cwd())
    this.productRepository = new JsonProductRepository(join(process.cwd(), process.env.DATA_FILE_LOCATION));

    this.getProductUseCase = new GetProductUseCase(this.productRepository);
    this.updateStockUseCase = new UpdateStockUseCase(this.productRepository);
  }

  /**
   * Affiche un produit formaté
   * @param {import('../../../domain/entities/Product.js').Product} product
   */
  #displayProduct(product) {
    const productDTO = presentProduct(product);
    console.log(formatProductForDisplay(productDTO));
  }

  /**
   * Demande une action (réapprovisionner ou utiliser)
   * @returns {Promise<{action: 'restock'|'use', quantity: number}|null>}
   */
  async #askForStockAction() {
    return new Promise((resolve) => {
      this.rl.question(
        'Action (r = réapprovisionner, u = utiliser, b = back, q = quitter): ',
        (answer) => {
          const action = answer.toLowerCase().trim();

          if (action === 'q') {
            this.rl.close();
            process.exit(0);
          }

          if (action === 'b') {
            return resolve(null);
          }

          if (action !== 'r' && action !== 'u') {
            console.log('❌ Réponse invalide. Veuillez entrer "r", "u", "b" ou "q".');
            return resolve(this.#askForStockAction());
          }

          this.rl.question('Quantité: ', (quantityInput) => {
            const quantity = Number.parseInt(quantityInput, 10);
            if (Number.isNaN(quantity) || quantity <= 0) {
              console.log('❌ La quantité doit être un nombre entier positif.');
              return resolve(this.#askForStockAction());
            }
            resolve({ action: action === 'r' ? 'restock' : 'use', quantity });
          });
        }
      );
    });
  }

  /**
   * Exporte tous les produits vers un fichier CSV (streaming, ligne par ligne)
   */
  async #exportProducts() {
    const destinationPath = join(process.cwd(), process.env.EXPORT_FILE_LOCATION ?? './data/products-export.csv');
    const products = await this.productRepository.list();
    await exportProductsToCsv(products, destinationPath);
    console.log(`✅ ${products.length} produit(s) exporté(s) vers ${destinationPath}\n`);
  }

  /**
   * Affiche le menu d'aide
   */
  #displayHelp() {
    console.log('🚗 CLI de Gestion de Stock - Garagiste 🔧');
    console.log('========================================');
    console.log('Commandes disponibles:');
    console.log('  - Saisir un numéro de produit (ex: PNEU-001)');
    console.log('  - export : Exporter tous les produits en CSV');
    console.log('  - q : Quitter l\'application');
    console.log('  - help : Afficher cette aide');
    console.log('----------------------------------------');
    console.log('Actions disponibles après sélection:');
    console.log('  - r : Réapprovisionner');
    console.log('  - u : Utiliser');
    console.log('  - b : Retour à la saisie du produit');
    console.log('  - q : Quitter');
    console.log('----------------------------------------');
    console.log('Produits disponibles:');
    console.log('  PNEU-001     : Pneu Michelin 205/55 R16');
    console.log('  PNEU-002     : Pneu Continental 195/65 R15');
    console.log('  ESSUIE-001   : Balai d\'essuie-glace Bosch');
    console.log('  VIDANGE-001  : Kit vidange 5W40');
    console.log('  FREIN-001    : Plaquettes de frein Brembo');
    console.log('  BATTERIE-001 : Batterie 12V 60Ah');
    console.log('========================================\n');
  }

  async start() {
    this.#displayHelp();

    while (true) {
      try {
        const productId = await new Promise((resolve) => {
          this.rl.question('Numéro de produit (q pour quitter): ', resolve);
        });

        if (productId.toLowerCase().trim() === 'q') {
          this.rl.close();
          break;
        }

        if (productId.toLowerCase().trim() === 'help') {
          this.#displayHelp();
          continue;
        }

        if (productId.toLowerCase().trim() === 'export') {
          await this.#exportProducts();
          continue;
        }

        const product = await this.getProductUseCase.execute(productId);
        if (!product) {
          console.log(`❌ Produit "${productId}" introuvable.`);
          console.log('Tapez "help" pour voir la liste des produits disponibles.\n');
          continue;
        }

        this.#displayProduct(product);

        const actionResult = await this.#askForStockAction();
        if (actionResult === null) {
          continue;
        }

        const { action, quantity } = actionResult;
        const updatedProduct = await this.updateStockUseCase.execute(
          productId,
          action,
          quantity
        );

        console.log('\n✅ Stock mis à jour avec succès !');
        this.#displayProduct(updatedProduct);
      } catch (error) {
        console.log(`\n❌ Erreur: ${error.message}\n`);
      }
    }
  }
}
