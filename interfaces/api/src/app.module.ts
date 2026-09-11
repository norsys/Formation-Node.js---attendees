import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule } from '@nestjs/config';
import { ListProductsUseCase } from 'stock-management--domain/usecases/ListProductsUseCase.js';
import type { ProductRepository } from 'stock-management--domain/repositories/ProductRepository.js';
import { JsonProductRepository } from "stock-management--file-persistance/JsonProductRepository.js";

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'api',
    }),
    ConfigModule.forRoot()
  ],
  controllers: [AppController],
  providers: [
      AppService,
      {
        provide: ListProductsUseCase,
        useFactory: (repo: ProductRepository) => new ListProductsUseCase(repo),
        inject: ['PRODUCT_REPOSITORY']
      },
      {
        provide: 'PRODUCT_REPOSITORY',
        useFactory: () => new JsonProductRepository('../../data/products.json'),
      }
    ]
})
export class AppModule {}
