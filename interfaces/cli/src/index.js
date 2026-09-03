import 'dotenv/config';
import { CLI } from './CLI.js';

// Point d'entrée de l'application
const cli = new CLI();

// Démarre l'application avec gestion des erreurs globales
process.on('unhandledRejection', (error) => {
  console.error('❌ Erreur non gérée:', error.message);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Exception non capturée:', error.message);
  process.exit(1);
});

try {
  await cli.start();
} catch (error) {
  console.error(error)
}
