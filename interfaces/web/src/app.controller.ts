import { Controller, Get, NotFoundException, Param, Patch, Query } from '@nestjs/common';
import { AppService } from './app.service.js';
import { ProductsService } from './products.service.js';
import { Product } from 'stock-management--domain/entities/Product.js';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly productsService: ProductsService) { }

  @Get("/helloWorld")
  getHello(): string {
    return this.appService.getHello();
  }
  @Get("/products")
  getProducts(): object {
    return this.productsService.getProducts();
  }
  @Get("/products/:productReference")
  getProductByReference(@Param("productReference") productReference: string): object {
    return this.productsService.getProductByReference(productReference);
  }

  @Patch("/products/:productReference/restock")
  restock(@Param("productReference") productReference: string, @Query("quantity") quantity: string): object {
    return this.productsService.restockProduct(productReference, quantity);
  }

  @Patch("/products/:productReference/use")
  use(@Param("productReference") productReference: string, @Query("quantity") quantity: string): object {
    return this.productsService.use(productReference, quantity);
  }
}
