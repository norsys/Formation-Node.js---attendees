import { Controller, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Query } from '@nestjs/common';
import { AppService } from './app.service.js';
import { error } from 'console';
import { ListProductsUseCase } from '../../../domain/src/usecases/ListProductsUseCase.js';
import { GetProductUseCase } from '../../../domain/src/usecases/GetProductUseCase.js';
import { InvalidProductIdError, ProductNotFoundError } from 'stock-management--domain/errors';
import { UpdateStockUseCase } from 'stock-management--domain/usecases/UpdateStockUseCase.js';

@Controller('products')
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly listProductsUsecase: ListProductsUseCase,
    private readonly getProductUsecase: GetProductUseCase,
    private readonly updateStockUsecase: UpdateStockUseCase) { }

  @Get()
  @HttpCode(200)
  getProducts() {
    return this.listProductsUsecase.execute()
      .then((products) => products.map(({ id, description }) => ({ id, description })))
  }

  @Get(':productReference')
  @HttpCode(200)
  getProductByReference(@Param('productReference') productReference: string) {
    return this.getProductUsecase.execute(productReference)
      .catch(error => {
        if (error instanceof InvalidProductIdError) {
          throw new HttpException({
            status: HttpStatus.BAD_REQUEST,
            error: "Bad Request!"
          }, HttpStatus.BAD_REQUEST, { cause: error })
        }
        if (error instanceof ProductNotFoundError) {
          throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            error: "Product not found!"
          }, HttpStatus.NOT_FOUND, { cause: error })
        }
      })
  }

  @Patch(':productReference/restock')
  @HttpCode(200)
  restockQuantity(@Param('productReference') productReference: string, @Query('quantity') quantity: string) {
    return this.updateStockUsecase.execute(productReference, 'restock', Number.parseInt(quantity))
      .catch(error => {
        if (error instanceof InvalidProductIdError) {
          throw new HttpException({
            status: HttpStatus.BAD_REQUEST,
            error: "Bad Request!"
          }, HttpStatus.BAD_REQUEST, { cause: error })
        }
        if (error instanceof ProductNotFoundError) {
          throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            error: "Product not found!"
          }, HttpStatus.NOT_FOUND, { cause: error })
        }
        else  throw error;
      })
  }
}
