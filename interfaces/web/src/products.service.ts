import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { Product } from 'stock-management--domain/entities/Product.js';
import { JsonProductRepository } from 'stock-management--file-persistance/JsonProductRepository.js';



@Injectable()
export class ProductsService {
  getProducts(): object {
    const productRepository = new JsonProductRepository(join(process.cwd(), "../../data/products.json"));
    return productRepository
      .list()
      .then(list => list.map(({ id, description }) => ({ id, description })));
  }
}
