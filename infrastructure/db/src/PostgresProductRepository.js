import { ProductRepository } from 'stock-management--domain/repositories/ProductRepository.js';
import { prisma } from './lib/prisma.ts';

export class PostgresProductRepository extends ProductRepository {

  getById(id) {
    return prisma.products.findFirst({
      where: { id: id }
    });
  }

  update(product) {
    return prisma.products.update({
      where: { id: product.id },
      data: product
    });
  }

  list() {
    return prisma.products.findMany();
  }
}