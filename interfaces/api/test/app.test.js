import { describe, it, before } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';

// On force le chemin du fichier vers un fichier JSON de FIXTURES/TESTS
process.env.DATA_FILE_LOCATION = "./data/products-test.json"

// On importe app APRÈS avoir défini la variable d'environnement
const { default: app } = await import('../src/app.js');

describe('API Products', () => {
  
  it('GET /products doit retourner la liste des produits', async () => {
    const response = await request(app.callback())
      .get('/products')
      .expect('Content-Type', /json/)
      .expect(200);

    assert.ok(Array.isArray(response.body));
    const product1 = response.body[0];
    const product2 = response.body[1];
    assert.equal(response.body.length, 2)
    assert.equal(product1.id, 'TEST-001')
    assert.equal(product1.description, 'Desc 1')
    assert.equal(product2.id, 'TEST-002')
    assert.equal(product2.description, 'Desc 2')
  });

  it('GET /products/:id doit retourner un produit existant', async () => {
    const response = await request(app.callback())
      .get('/products/TEST-002')
      .expect(200);
    const product = response.body;
    assert.equal(product.id, 'TEST-002')
    assert.equal(product.description, 'Desc 2')
    assert.equal(product.stock, 5)
    assert.equal(product.updatedAt, '2026-06-18T10:00:00.000Z')
  });

  it('GET /products/:id doit retourner une 404 si le produit n\'existe pas', async () => {
    const response = await request(app.callback())
      .get('/products/999999')
      .expect(404);

    // Vérifie le format d'erreur généré par ton middleware
    assert.deepEqual(response.body, {
      reason: 'Produit introuvable'
    });
  });

  it('PATCH /products/:id/restock doit mettre à jour le stock', async () => {
    const responseBefore = await request(app.callback())
      .get('/products/TEST-001')
      .expect(200);
    const stock = responseBefore.body.stock;
    const updatedAt = new Date(responseBefore.body.updatedAt);

    const response = await request(app.callback())
      .patch('/products/TEST-001/restock?quantity=10')
      .expect(200);
    const product = response.body;
    assert.equal(product.stock, stock+10)
    assert.equal(new Date(product.updatedAt) > updatedAt, true)
  });

  it('PATCH /products/:id/use doit mettre à jour le stock', async () => {
    const responseBefore = await request(app.callback())
      .get('/products/TEST-001')
      .expect(200);
    const stock = responseBefore.body.stock;
    const updatedAt = new Date(responseBefore.body.updatedAt);

    const response = await request(app.callback())
      .patch('/products/TEST-001/use?quantity=10')
      .expect(200);
    const product = response.body;
    assert.equal(product.stock, stock-10)
    assert.equal(new Date(product.updatedAt) > updatedAt, true)
  });

});