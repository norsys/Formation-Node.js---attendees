
import { ProductNotFoundError, InvalidProductIdError, InvalidQuantityError, InsufficientStockError } from 'stock-management--domain/errors';
import { GetProductUseCase } from 'stock-management--domain/usecases/GetProductUseCase.js';
import { ListProductsUseCase } from 'stock-management--domain/usecases/ListProductsUseCase.js';
import { UpdateStockUseCase } from 'stock-management--domain/usecases/UpdateStockUseCase.js';
import { MongoProductRepository } from 'stock-management--database-persistance/MongoProductRepository.js'; 


const jsonProductRepository = new MongoProductRepository(process.env.DATA_FILE_LOCATION);
const listProductsUseCase = new ListProductsUseCase(jsonProductRepository);
const getProductUseCase = new GetProductUseCase(jsonProductRepository);
const updateStockUseCase = new UpdateStockUseCase(jsonProductRepository);

export const getProducts =  ctx => {
  return listProductsUseCase.execute()
    .then(products =>  products.map( p => ({id: p.id , description: p.description})))
    .then(p => ctx.body = p)
}


// version await
export const getProductAwait = async ctx => {
  const id = ctx.params.id;
  try {
    const product = await getProductUseCase.execute(id)
    ctx.body = product;
  } 
  catch( e ) {
    if (e instanceof ProductNotFoundError) {
      ctx.throw(404, 'Produit introuvable');
    } else if (e instanceof InvalidProductIdError) {
      ctx.throw(400, {reason : 'ID du produit invalide'});
    } else {
      ctx.throw(500, 'Erreur interne au serveur');
    }
  }

};


// version .then
export const getProductThen = (ctx) => { // Pas besoin de "async" ici
  const id = ctx.params.id;

  // Le "return" indique à Koa qu'il doit attendre cette promesse
  return getProductUseCase.execute(id)
    .then(product => {
      ctx.body = 'Product page ' + product.description;
    });
};



export const restock =  async ctx => {
  const id = ctx.params.id;
  const qt = Number(ctx.query.quantity);

  try {
    const product = await updateStockUseCase.execute(id, 'restock', qt)
    ctx.body = product;
  } 
  catch( e ) {
    if (e instanceof ProductNotFoundError) {
      ctx.throw(404, 'Produit introuvable');
    } else if (e instanceof InvalidQuantityError) {
      ctx.throw(400, {reason: 'Quantité invalide'});
    } else {
      ctx.throw(500, 'Erreur interne au serveur');
    }
  }
}

export const use =  async ctx => {
  const id = ctx.params.id;
  const qt = Number(ctx.query.quantity);
  try {
  const product = await updateStockUseCase.execute(id, 'use', qt)
    ctx.body = product;
  } 
  catch( e ) {
    if (e instanceof ProductNotFoundError) {
      ctx.throw(404, 'Produit introuvable');
    } else if (e instanceof InvalidQuantityError) {
      ctx.throw(400, 'Quantité invalide', {reason: 'Quantité invalide'});
    } else if (e instanceof InsufficientStockError) {
      ctx.throw(422, 'Stock insuffisant');
    } else{
      ctx.throw(500, 'Erreur interne au serveur');
    }
  }
}
