/**
 * Tests unitaires pour UpdateStockUseCase
 * Convention : Arrange-Act-Assert
 * Descriptions : should [expected feature] when [condition]
 */

import { test, describe, it, mock } from 'node:test';
import assert from 'node:assert/strict';
import { UpdateStockUseCase } from '../../src/usecases/UpdateStockUseCase.js';
import { Product } from '../../src/entities/Product.js';
import {
  InsufficientStockError,
  InvalidActionError,
  InvalidProductIdError,
  InvalidQuantityError,
} from '../../src/errors/index.js';

// Fixtures
const validProductId = 'PNEU-001';
const existingProduct = new Product(validProductId, 'Pneu Michelin', 10);
const restockedProduct = new Product(validProductId, 'Pneu Michelin', 15, new Date());
const usedProduct = new Product(validProductId, 'Pneu Michelin', 5, new Date());

let mockRepository;
let useCase;

describe('UpdateStockUseCase', () => {
  // Reset mocks avant chaque test
  test.beforeEach(() => {
    mockRepository = {
      getById: mock.fn(),
      update: mock.fn()
    };
    useCase = new UpdateStockUseCase(mockRepository);
  });

  describe('Validation', () => {
    describe('productId validation', () => {
      it('should throw error when productId is null', async () => {
        // Arrange - Act - Assert
        await assert.rejects(
          async () => await useCase.execute(null, 'restock', 5),
          InvalidProductIdError,
        );
      });

      it('should throw error when productId is undefined', async () => {
        // Arrange - Act - Assert
        await assert.rejects(
          async () => await useCase.execute(undefined, 'restock', 5),
          InvalidProductIdError,
        );
      });

      it('should throw error when productId is not a string', async () => {
        // Arrange - Act - Assert
        await assert.rejects(
          async () => await useCase.execute(12345, 'restock', 5),
          InvalidProductIdError,
        );
      });

      it('should throw error when productId is empty string', async () => {
        // Arrange - Act - Assert
        await assert.rejects(
          async () => await useCase.execute('', 'restock', 5),
          InvalidProductIdError,
        );
      });
    });

    it('should throw error when action is not \'restock\' or \'use\'', async () => {
      // Arrange - Act - Assert
      await assert.rejects(
        async () => await useCase.execute(validProductId, 'invalid', 5),
        InvalidActionError,
      );
    });

    describe('quantity validation', () => {
      it('should throw error when quantity is not a number', async () => {
        // Arrange - Act - Assert
        await assert.rejects(
          async () => await useCase.execute(validProductId, 'restock', 'five'),
          InvalidQuantityError,
        );
      });

      it('should throw error when quantity is not an integer', async () => {
        // Arrange - Act - Assert
        await assert.rejects(
          async () => await useCase.execute(validProductId, 'restock', 5.5),
          InvalidQuantityError,
        );
      });

      it('should throw error when quantity is zero', async () => {
        // Arrange - Act - Assert
        await assert.rejects(
          async () => await useCase.execute(validProductId, 'restock', 0),
          InvalidQuantityError,
        );
      });

      it('should throw error when quantity is negative', async () => {
        // Arrange - Act - Assert
        await assert.rejects(
          async () => await useCase.execute(validProductId, 'restock', -5),
          InvalidQuantityError,
        );
      });
    });

    it('should throw error when product does not exist', async () => {
      // Arrange
      mockRepository.getById = mock.fn(async () => null);

      // Act - Assert
      await assert.rejects(
        async () => await useCase.execute(validProductId, 'restock', 5),
        {
          name: 'ProductNotFoundError',
          message: `No product corresponding to given reference: ${validProductId}`,
        },
      );
      assert.strictEqual(mockRepository.getById.mock.calls.length, 1);
      assert.strictEqual(mockRepository.getById.mock.calls[0].arguments[0], validProductId);
    });
  });

  describe('Happy path', () => {
    it('should return updated product when restock succeeds', async () => {
      // Arrange
      mockRepository.getById = mock.fn(async () => existingProduct);
      mockRepository.update = mock.fn(async () => {});
      const expectedStock = existingProduct.stock + 5;

      // Act
      const result = await useCase.execute(validProductId, 'restock', 5);

      // Assert
      assert.strictEqual(result.id, validProductId);
      assert.strictEqual(result.description, existingProduct.description);
      assert.strictEqual(result.stock, expectedStock);
      assert.strictEqual(mockRepository.getById.mock.calls.length, 1);
      assert.strictEqual(mockRepository.getById.mock.calls[0].arguments[0], validProductId);
      assert.strictEqual(mockRepository.update.mock.calls.length, 1);
      assert.strictEqual(mockRepository.update.mock.calls[0].arguments[0].stock, expectedStock);
    });

    it('should return updated product when use succeeds', async () => {
      // Arrange
      mockRepository.getById = mock.fn(async () => existingProduct);
      mockRepository.update = mock.fn(async () => {});
      const expectedStock = existingProduct.stock - 5;

      // Act
      const result = await useCase.execute(validProductId, 'use', 5);

      // Assert
      assert.strictEqual(result.id, validProductId);
      assert.strictEqual(result.description, existingProduct.description);
      assert.strictEqual(result.stock, expectedStock);
      assert.strictEqual(mockRepository.getById.mock.calls.length, 1);
      assert.strictEqual(mockRepository.getById.mock.calls[0].arguments[0], validProductId);
      assert.strictEqual(mockRepository.update.mock.calls.length, 1);
      assert.strictEqual(mockRepository.update.mock.calls[0].arguments[0].stock, expectedStock);
    });

    it('should persist product update when restock succeed', async () => {
      // Arrange
      mockRepository.getById = mock.fn(async () => existingProduct);
      mockRepository.update = mock.fn(async () => {});

      // Act
      await useCase.execute(validProductId, 'restock', 5);

      // Assert
      assert.strictEqual(mockRepository.update.mock.calls.length, 1);
      assert.strictEqual(mockRepository.update.mock.calls[0].arguments[0].stock, existingProduct.stock + 5);
    });

    it('should persist product update when use succeed', async () => {
      // Arrange
      mockRepository.getById = mock.fn(async () => existingProduct);
      mockRepository.update = mock.fn(async () => {});

      // Act
      await useCase.execute(validProductId, 'use', 5);

      // Assert
      assert.strictEqual(mockRepository.update.mock.calls.length, 1);
      assert.strictEqual(mockRepository.update.mock.calls[0].arguments[0].stock, existingProduct.stock - 5);
    });

    it('should throw error from Product.use when stock is insufficient', async () => {
      // Arrange
      const lowStockProduct = new Product(validProductId, 'Pneu Michelin', 3);
      mockRepository.getById = mock.fn(async () => lowStockProduct);
      mockRepository.update = mock.fn(async () => {});

      // Act - Assert
      await assert.rejects(
        async () => await useCase.execute(validProductId, 'use', 10),
        InsufficientStockError,
      );
    });

    it('should throw error from Product.restock when quantity is invalid', async () => {
      // Arrange
      mockRepository.getById = mock.fn(async () => existingProduct);
      mockRepository.update = mock.fn(async () => {});

      // Act - Assert
      await assert.rejects(
        async () => await useCase.execute(validProductId, 'restock', -5),
        InvalidQuantityError,
      );
    });
  });
});
