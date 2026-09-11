import { ProductNotFoundError, InvalidProductIdError } from 'stock-management--domain/errors';
import { GetProductUseCase } from 'stock-management--domain/usecases/GetProductUseCase.js';
import { ListProductsUseCase } from 'stock-management--domain/usecases/ListProductsUseCase.js';
import { UpdateStockUseCase } from 'stock-management--domain/usecases/UpdateStockUseCase.js';
import { JsonProductRepository } from 'stock-management--file-persistance/JsonProductRepository.js'; 


export const getProducts =  ctx => {
  return new ListProductsUseCase(new JsonProductRepository("../../data/products.json"))
    .execute()
    .then(products =>  products.map( p => ({id: p.id , description: p.id})))
    .then(p => ctx.body = p)
}


// version await
export const getProductAwait = async ctx => {
  const id = ctx.params.id;
  try {
    const product = await new GetProductUseCase(new JsonProductRepository(FILE_PATH)).execute(id)
    ctx.body = product;
  } 
  catch( e ) {
    if (e instanceof ProductNotFoundError) {
      ctx.throw(404, 'Produit introuvable');
    } else if (e instanceof InvalidProductIdError) {
      ctx.throw(400, 'ID du produit invalide');
    } else {
      ctx.throw(500, 'Erreur interne au serveur');
    }
  }

};


const FILE_PATH = "../../data/products.json";
// version .then
export const getProductThen = (ctx) => { // Pas besoin de "async" ici
  const id = ctx.params.id;

  // Le "return" indique à Koa qu'il doit attendre cette promesse
  return new GetProductUseCase(new JsonProductRepository(FILE_PATH))
    .execute(id)
    .then(product => {
      ctx.body = 'Product page ' + product.description;
    });
};



export const restock =  async ctx => {
  const id = ctx.params.id;
  const qt = Number(ctx.query.quantity);
  console.log(qt);
  const product = await new UpdateStockUseCase(new JsonProductRepository(FILE_PATH)).execute(id, 'restock', qt)
  ctx.body = product;
}
