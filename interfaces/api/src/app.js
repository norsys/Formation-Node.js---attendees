import Koa from 'koa';
import Router from '@koa/router';
import { getProducts, getProductAwait, getProductThen, restock, use } from './service/productService.js';

const app = new Koa();
const router = new Router();

// 1. Les middlewares globaux d'erreur doivent être placés AVANT les routes !
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = {
      reason: err.message
    };
  }
});

router.get('/products', getProducts);
router.get('/products/:id', getProductAwait);
router.get('/products-then/:id', getProductThen);
router.patch('/products/:id/restock', restock);
router.patch('/products/:id/use', use);

app.use(router.routes());
app.use(router.allowedMethods());

export default app;