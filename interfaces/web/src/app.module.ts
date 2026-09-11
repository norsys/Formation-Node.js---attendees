import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ProductsService } from './products.service.js';
// import { JsonProductRepository } from 'stock-management--file-persistance/JsonProductRepository.js';
import { pgProductRepository } from 'stock-management--db-persistance/pgProductRepository.js';
// import { join } from 'path';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'web',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ProductsService, pgProductRepository],
})
export class AppModule { }
