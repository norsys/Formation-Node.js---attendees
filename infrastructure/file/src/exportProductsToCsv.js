import { createWriteStream } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { Readable, Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';

const CSV_HEADER = 'id,description,stock,updatedAt\n';

function escapeCsvField(value) {
  const stringValue = String(value);
  if (/[",\n]/.test(stringValue)) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
}

/**
 * Exporte une liste de produits vers un fichier CSV, un produit à la fois (streaming),
 * sans jamais charger le CSV complet en mémoire.
 * @param {import('stock-management--domain/entities/Product.js').Product[]} products
 * @param {string} destinationPath
 * @returns {Promise<void>}
 */
export async function exportProductsToCsv(products, destinationPath) {
  const toCsvLine = new Transform({
    objectMode: true,
    transform(product, _encoding, callback) {
      const line = [product.id, product.description, product.stock, product.updatedAt.toISOString()]
        .map(escapeCsvField)
        .join(',');
      callback(null, `${line}\n`);
    },
  });

  await mkdir(dirname(destinationPath), { recursive: true });

  const writeStream = createWriteStream(destinationPath);
  writeStream.write(CSV_HEADER);

  await pipeline(Readable.from(products), toCsvLine, writeStream);
}
