/**
 * Tests unitaires pour ListProductsUseCase
 * Convention : Arrange-Act-Assert
 */

import { test, describe, it, mock } from 'node:test';
import assert from 'node:assert/strict';
import { ListProductsUseCase } from '../../src/usecases/ListProductsUseCase.js';
import { Product } from '../../src/entities/Product.js';

const products = [
  new Product('PNEU-001', 'Pneu Michelin', 10),
  new Product('FREIN-001', 'Plaquettes de frein Brembo', 8),
];

let mockRepository;
let useCase;

describe('ListProductsUseCase', () => {
  test.beforeEach(() => {
    mockRepository = {
      list: mock.fn(),
    };
    useCase = new ListProductsUseCase(mockRepository);
  });

  it('should return all products from repository', async () => {
    mockRepository.list = mock.fn(async () => products);

    const result = await useCase.execute();

    assert.deepStrictEqual(result, products);
    assert.strictEqual(mockRepository.list.mock.calls.length, 1);
  });

  it('should return empty array when repository has no products', async () => {
    mockRepository.list = mock.fn(async () => []);

    const result = await useCase.execute();

    assert.deepStrictEqual(result, []);
    assert.strictEqual(mockRepository.list.mock.calls.length, 1);
  });
});
