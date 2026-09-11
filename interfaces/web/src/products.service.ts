import { Injectable } from '@nestjs/common';
import { Product } from 'stock-management--domain/entities/Product.js';
import { JsonProductRepository } from 'stock-management--file-persistance/JsonProductRepository.js';



@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: JsonProductRepository) { }

  getProducts(): object {
    return this.productRepository
      .list()
      .then(list => list.map(({ id, description }) => ({ id, description })));
  }
  getProductByReference(productReference: string): Promise<Product | undefined> {
    return this.productRepository
      .getById(productReference);
  }
  restockProduct(productReference: string, quantity: number): Promise<Product | undefined> {

    this.getProductByReference(productReference).then(p => {
      if (p === undefined) return undefined;
      this.productRepository.update(p.restock(quantity));

    }
    )
    return this.getProductByReference(productReference)
  }

}
