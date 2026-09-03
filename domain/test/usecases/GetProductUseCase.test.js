/**
 * Tests unitaires pour GetProductUseCase
 * Convention : Arrange-Act-Assert
 * Descriptions : should [expected feature] when [condition]
 */

import { test, describe, it, mock } from 'node:test';
import assert from 'node:assert/strict';
import { GetProductUseCase } from '../../src/usecases/GetProductUseCase.js';
import { Product } from '../../src/entities/Product.js';
import {
  InvalidProductIdError,
  ProductNotFoundError,
} from '../../src/errors/index.js';

// Fixtures
const validProductId = 'PNEU-001';
const existingProduct = new Product(validProductId, 'Pneu Michelin', 10);

let mockRepository;
let useCase;

describe('GetProductUseCase', () => {
  // Reset mocks avant chaque test
  test.beforeEach(() => {
    mockRepository = {
      getById: mock.fn()
    };
    useCase = new GetProductUseCase(mockRepository);
  });

  describe('Validation', () => {
    it('should throw error when productId is null', async () => {
      // Arrange - Act - Assert
      await assert.rejects(
        async () => await useCase.execute(null),
        InvalidProductIdError,
      );
    });

    it('should throw error when productId is undefined', async () => {
      // Arrange - Act - Assert
      await assert.rejects(
        async () => await useCase.execute(undefined),
        InvalidProductIdError,
      );
    });

    it('should throw error when productId is not a string', async () => {
      // Arrange - Act - Assert
      await assert.rejects(
        async () => await useCase.execute(12345),
        InvalidProductIdError,
      );
    });

    it('should throw error when productId is empty string', async () => {
      // Arrange - Act - Assert
      await assert.rejects(
        async () => await useCase.execute(''),
        InvalidProductIdError,
      );
    });
  });

  describe('Happy path', () => {
    it('should return product when valid productId and product exists', async () => {
      // Arrange
      mockRepository.getById = mock.fn(async () => existingProduct);

      // Act
      const result = await useCase.execute(validProductId);

      // Assert
      assert.deepStrictEqual(result, existingProduct);
      assert.strictEqual(mockRepository.getById.mock.calls.length, 1);
      assert.strictEqual(mockRepository.getById.mock.calls[0].arguments[0], validProductId);
    });

    it('should throw not found error when valid productId and product does not exist', async () => {
      // Arrange
      mockRepository.getById = mock.fn(async () => null);

      // Act - Assert
      await assert.rejects(
        async () => await useCase.execute(validProductId),
        ProductNotFoundError,
      );
    });
  });
});
