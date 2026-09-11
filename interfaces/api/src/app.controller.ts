import { Controller, Get, HttpCode } from '@nestjs/common';
import { AppService } from './app.service.js';
import { error } from 'console';
import { ListProductsUseCase } from '../../../domain/src/usecases/ListProductsUseCase.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly listProductsUsecase: ListProductsUseCase) {}
  

  @Get('/products')
  @HttpCode(200)
  getProducts() {
    return this.listProductsUsecase.execute();
  }
}
