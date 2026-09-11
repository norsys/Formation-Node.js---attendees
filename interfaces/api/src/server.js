import Koa from 'koa';
import Router from '@koa/router';
import {index, about, getProduct} from './controllers/stock.js';

const app = new Koa();
const router = new Router();

router.get('/', index);
router.get('/about', about);
router.get('/getProduct/:id', getProduct)

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);