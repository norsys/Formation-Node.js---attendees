import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
  getProductByReference(productReference: string): Promise<Product> {
    return this.productRepository
      .getById(productReference).then(p => {
        if (p === undefined) throw new NotFoundException("Product not found")
        return p
      });
  }
  restockProduct(productReference: string, quantity: string): Promise<Product | undefined> {

    const quantityNumber = Number.parseInt(quantity);

    if (quantityNumber < 0) throw new BadRequestException("Qauntité invalide")

    return this.getProductByReference(productReference).then(p => {
      if (p === undefined) return undefined;
      const restockedProduct = p.restock(quantityNumber);
      return this.productRepository.update(restockedProduct).then(() => restockedProduct);
    }
    )
  }

}
