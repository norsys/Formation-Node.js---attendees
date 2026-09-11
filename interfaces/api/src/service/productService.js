import { GetProductUseCase } from 'stock-management--domain/usecases/GetProductUseCase.js';
import { JsonProductRepository } from 'stock-management--file-persistance/JsonProductRepository.js'; 


// version await
export const getProductAwait = async ctx => {
  const id = ctx.params.id;
  const product = await new GetProductUseCase(new JsonProductRepository("../../data/products.json")).execute(id)
  ctx.body = 'Product page ' + product.description;
};


// version .then
export const getProductThen = (ctx) => { // Pas besoin de "async" ici
  const id = ctx.params.id;

  // Le "return" indique à Koa qu'il doit attendre cette promesse
  return new GetProductUseCase(new JsonProductRepository("../../data/products.json"))
    .execute(id)
    .then(product => {
      ctx.body = 'Product page ' + product.description;
    });
};