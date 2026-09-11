import Koa from 'koa';
import Router from '@koa/router';
import {getProducts, getProductAwait, getProductThen} from './service/productService.js';

const app = new Koa();
const router = new Router();

router.get('/products', getProducts)
router.get('/products/:id', getProductAwait)
router.get('/products-then/:id', getProductThen)

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);