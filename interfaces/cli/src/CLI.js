import readline from 'node:readline';
import {getProductById} from './product.js'

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
  }

  /**
   * Demande une action (réapprovisionner ou utiliser)
   * @returns {Promise<{action: 'restock'|'use', quantity: number}|null>}
   */
  #askForStockAction() {
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

        if(!productId.trim()) {
          console.log("Id invalide");
          continue;
        }

        const product = await getProductById(productId);
        console.log(product);

        const actionResult = await this.#askForStockAction();
        if (actionResult === null) {
          continue;
        }
        console.log('Not implemented yet.');
      } catch (error) {
        console.log(`\n❌ Erreur: ${error.message}\n`);
      }
    }
  }
}
