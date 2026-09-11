import { GetProductUseCase } from 'stock-management--domain/usecases/GetProductUseCase.js';
import { ProductRepository } from 'stock-management--domain/repositories/ProductRepository.js';


export const index = async ctx => {
  ctx.body = 'Welcome to Home Page';
};

export const about = async ctx => {
  ctx.body = 'This is About Page';
};


export const getProduct = async ctx => {
  const id = ctx.params.id;
  new GetProductUseCase().execute(id).then(product => {
    ctx.body = 'Product page ' + product.description;
  })
  

};

