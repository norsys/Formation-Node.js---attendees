import { BadRequestException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { error } from 'console';
import { pgProductRepository } from 'stock-management--db-persistance/pgProductRepository.js';
import { Product } from 'stock-management--domain/entities/Product.js';
import { InsufficientStockError } from 'stock-management--domain/errors';



@Injectable()
export class ProductsService {
  use(productReference: string, quantity: string): object {

    const quantityNumber = Number.parseInt(quantity);

    if (quantityNumber < 0) throw new BadRequestException("Qauntité invalide")


    return this.getProductByReference(productReference).then(p => {
      if (p === undefined || p === null) return undefined;
      try {
        const usedProduct = p.use(quantityNumber);
        return this.productRepository.update(usedProduct).then(() => usedProduct);
      } catch (error) {
        if (error instanceof InsufficientStockError) {
          throw new UnprocessableEntityException();

        }
      }
    }
    )
  }
  constructor(private readonly productRepository: pgProductRepository) { }

  getProducts(): object {
    return this.productRepository
      .list()
      .then(list => list.map(({ id, description }) => ({ id, description })));
  }
  getProductByReference(productReference: string): Promise<Product | null> {
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
      if (p === undefined || p === null) return undefined;
      const restockedProduct = p.restock(quantityNumber);
      return this.productRepository.update(restockedProduct).then(() => restockedProduct);
    }
    )
  }

}
