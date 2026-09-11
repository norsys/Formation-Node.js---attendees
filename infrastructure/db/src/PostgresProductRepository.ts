import { ProductRepository } from 'stock-management--domain/repositories/ProductRepository.js';
import { prisma } from './lib/prisma.ts';
import { Product } from 'stock-management--domain/entities/Product.js';

export class PostgresProductRepository implements ProductRepository {

  getById(id: string): Promise<Product | null> {
    return prisma.products.findFirst({
      where: { id },
      include: {
        stock_history: {
          orderBy: { recorded_at: 'desc' },
          take: 1,
        },
      },
    }).then((productRow) => {
      if (!productRow) {
        return null;
      }

      const latestStockEntry = productRow.stock_history[0];

      return new Product(
        productRow.id,
        productRow.description,
        latestStockEntry?.stock ?? 0,
        latestStockEntry?.recorded_at,
      );
    });
  }

  update(product: Product): Promise<void> {
    return prisma.$transaction([
      prisma.products.update({
        where: { id: product.id },
        data: { description: product.description },
      }),
      prisma.stock_history.create({
        data: {
          product_id: product.id,
          stock: product.stock,
          recorded_at: product.updatedAt,
        },
      }),
    ]).then(() => undefined);
  }

  list(): Promise<Product[]> {
    return prisma.products.findMany({
      include: {
        stock_history: {
          orderBy: { recorded_at: 'desc' },
          take: 1,
        },
      },
    }).then((productRows) =>
      productRows.map((productRow) => {
        const latestStockEntry = productRow.stock_history[0];

        return new Product(
          productRow.id,
          productRow.description,
          latestStockEntry?.stock ?? 0,
          latestStockEntry?.recorded_at,
        );
      })
    );
  }
}