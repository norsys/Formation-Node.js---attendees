import Koa from 'koa';
import Router from '@koa/router';
import {getProducts, getProductAwait, getProductThen, restock, use} from './service/productService.js';

const app = new Koa();
const router = new Router();

router.get('/products', getProducts)
router.get('/products/:id', getProductAwait)
router.get('/products-then/:id', getProductThen)
router.patch('/products/:id/restock', restock) 
router.patch('/products/:id/use', use) 

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    // Renvoyer un objet JSON structuré avec les données de l'erreur
    ctx.body = {
      reason: err.message
    };
  }
});
app.use(router.routes());
app.use(router.allowedMethods());


app.listen(3000);