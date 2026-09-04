// MongoDB seed script for `stock_management`, in the Mongoose ORM shape
// consumed by infrastructure/mongo-orm (Koa uses `stock-management--mongo-orm-persistance`).
//
// The mongo-orm Mongoose schema defines `_id: String (required)` — the
// string product id is the document key — plus `description` and the
// embedded `stockHistory` array, matching
// infrastructure/mongo-orm/src/models/Product.js.
//
// Each product in data/products.json carries one stock snapshot, so each
// seed document has a single stockHistory entry with `recordedAt` ←
// `updatedAt`.
//
// Loaded by the official mongo image via /docker-entrypoint-initdb.d at
// first init only.

db = db.getSiblingDB('stock_management');

products = [
    {
     _id: 'PNEU-001',
     description: 'Pneu Michelin 205/55 R16',
     stockHistory: [
         { stock: 10, recordedAt: ISODate('2026-06-18T10:00:00Z') }
      ]
    },
    {
     _id: 'PNEU-002',
     description: 'Pneu Continental 195/65 R15',
     stockHistory: [
         { stock: 5, recordedAt: ISODate('2026-06-18T10:00:00Z') }
      ]
    },
    {
     _id: 'ESSUIE-001',
     description: "Balai d'essuie-glace Bosch",
     stockHistory: [
         { stock: 18, recordedAt: ISODate('2026-06-18T14:19:42.777Z') }
      ]
    },
    {
     _id: 'VIDANGE-001',
     description: 'Kit vidange 5W40',
     stockHistory: [
         { stock: 15, recordedAt: ISODate('2026-06-18T10:00:00Z') }
      ]
    },
    {
     _id: 'FREIN-001',
     description: 'Plaquettes de frein Brembo',
     stockHistory: [
         { stock: 8, recordedAt: ISODate('2026-06-18T10:00:00Z') }
      ]
    },
    {
     _id: 'BATTERIE-001',
     description: 'Batterie 12V 60Ah',
     stockHistory: [
         { stock: 8, recordedAt: ISODate('2026-06-18T14:24:32.565Z') }
      ]
    }
];

// Idempotency guard on a clean (first-init) data dir.
if (db.products.countDocuments({}) > 0) {
   print('Seed skipped: `products` collection is not empty.');
   exit(0);
}

db.products.insertMany(products);
print('Seeded ' + products.length + ' products into `stock_management.products`.');
