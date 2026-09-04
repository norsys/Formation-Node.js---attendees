-- Seed script for PostgreSQL, loaded at container startup via the
-- official image's /docker-entrypoint-initdb.d mechanism.
--
-- Schema mirrors infrastructure/postgres-native/migrations/001-init.sql
-- and infrastructure/postgres-prisma's stock_history table. Each product
-- from data/products.json (a current snapshot: stock + updatedAt) becomes:
--   * one row in `products` (identity + description), and
--   * one row in `stock_history` recording that snapshot as recorded_at.
--
-- The schema creation is idempotent so the file is safe to re-run.

CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  description TEXT NOT NULL CHECK (description <> '')
);

CREATE TABLE IF NOT EXISTS stock_history (
  id BIGSERIAL PRIMARY KEY,
  product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  stock INTEGER NOT NULL CHECK (stock >= 0),
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_stock_history_product_recorded_at
  ON stock_history (product_id, recorded_at DESC);

-- Products (identity only; live stock is derived from stock_history).
INSERT INTO products (id, description) VALUES
  ('PNEU-001',   'Pneu Michelin 205/55 R16'),
  ('PNEU-002',   'Pneu Continental 195/65 R15'),
  ('ESSUIE-001', 'Balai d''essuie-glace Bosch'),
  ('VIDANGE-001', 'Kit vidange 5W40'),
  ('FREIN-001',  'Plaquettes de frein Brembo'),
  ('BATTERIE-001', 'Batterie 12V 60Ah');

-- One stock-history snapshot per product (recorded_at <- updatedAt).
INSERT INTO stock_history (product_id, stock, recorded_at) VALUES
  ('PNEU-001',   10, TIMESTAMPTZ '2026-06-18T10:00:00.000Z'),
  ('PNEU-002',   5,  TIMESTAMPTZ '2026-06-18T10:00:00.000Z'),
  ('ESSUIE-001', 18, TIMESTAMPTZ '2026-06-18T14:19:42.777Z'),
  ('VIDANGE-001', 15, TIMESTAMPTZ '2026-06-18T10:00:00.000Z'),
  ('FREIN-001',   8,  TIMESTAMPTZ '2026-06-18T10:00:00.000Z'),
  ('BATTERIE-001', 8, TIMESTAMPTZ '2026-06-18T14:24:32.565Z');
