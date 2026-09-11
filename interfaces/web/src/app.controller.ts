import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service.js';
import { ProductsService } from './products.service.js';


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
}
