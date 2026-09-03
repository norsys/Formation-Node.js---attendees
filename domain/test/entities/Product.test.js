/**
 * Tests unitaires pour Product
 * Convention : Arrange-Act-Assert
 * Descriptions : should [expected feature] when [condition]
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { Product } from '../../src/entities/Product.js';
import {
  InsufficientStockError,
  InvalidQuantityError,
} from '../../src/errors/index.js';

// Fixtures
const productId = 'PNEU-001';
const description = 'Pneu Michelin';
const initialStock = 10;
const testDate = new Date('2024-01-01T00:00:00Z');

describe('Product', () => {
  describe('restock(quantity)', () => {
    describe('Validation', () => {
      it('should throw error when quantity is zero', () => {
        // Arrange
        const product = new Product(productId, description, initialStock, testDate);

        // Act - Assert
        assert.throws(
          () => product.restock(0),
          InvalidQuantityError,
        );
      });

      it('should throw error when quantity is negative', () => {
        // Arrange
        const product = new Product(productId, description, initialStock, testDate);

        // Act - Assert
        assert.throws(
          () => product.restock(-5),
          InvalidQuantityError,
        );
      });

      it('should throw error when quantity is not an integer', () => {
        // Arrange
        const product = new Product(productId, description, initialStock, testDate);

        // Act - Assert
        assert.throws(
          () => product.restock(5.5),
          InvalidQuantityError,
        );
      });
    });

    describe('Happy path', () => {
      it('should return product with increased stock when valid quantity', () => {
        // Arrange
        const product = new Product(productId, description, initialStock, testDate);
        const quantity = 5;
        const expectedStock = initialStock + quantity;

        // Act
        const result = product.restock(quantity);

        // Assert
        assert.strictEqual(result.stock, expectedStock);
        assert.strictEqual(result.id, productId);
        assert.strictEqual(result.description, description);
      });

      it('should return product with updated timestamp when restocking', () => {
        // Arrange
        const product = new Product(productId, description, initialStock, testDate);
        const quantity = 5;
        const beforeRestock = new Date();

        // Act
        const result = product.restock(quantity);

        // Assert
        assert.ok(result.updatedAt >= beforeRestock, 'Timestamp should be updated');
        assert.strictEqual(result.id, productId);
        assert.strictEqual(result.description, description);
        assert.strictEqual(result.stock, initialStock + quantity);
      });

      it('should preserve immutability when restocking', () => {
        // Arrange
        const product = new Product(productId, description, initialStock, testDate);
        const quantity = 5;

        // Act
        const result = product.restock(quantity);

        // Assert
        assert.notStrictEqual(result, product, 'Should return a new instance');
        assert.strictEqual(product.stock, initialStock, 'Original product should be unchanged');
      });
    });
  });

  describe('use(quantity)', () => {
    describe('Validation', () => {
      it('should throw error when quantity is zero', () => {
        // Arrange
        const product = new Product(productId, description, initialStock, testDate);

        // Act - Assert
        assert.throws(
          () => product.use(0),
          InvalidQuantityError,
        );
      });

      it('should throw error when quantity is negative', () => {
        // Arrange
        const product = new Product(productId, description, initialStock, testDate);

        // Act - Assert
        assert.throws(
          () => product.use(-5),
          InvalidQuantityError,
        );
      });

      it('should throw error when quantity is not an integer', () => {
        // Arrange
        const product = new Product(productId, description, initialStock, testDate);

        // Act - Assert
        assert.throws(
          () => product.use(5.5),
          InvalidQuantityError,
        );
      });

      it('should throw error when product stock is less than quantity', () => {
        // Arrange
        const product = new Product(productId, description, initialStock, testDate);
        const excessiveQuantity = initialStock + 5;

        // Act - Assert
        assert.throws(() => product.use(excessiveQuantity), InsufficientStockError);
      });

      it('should throw error with insufficient stock message when stock is low', () => {
        // Arrange
        const lowStockProduct = new Product(productId, description, 3, testDate);
        const quantity = 10;

        // Act - Assert
        assert.throws(() => lowStockProduct.use(quantity), {
          name: 'InsufficientStockError',
          message: 'Insufficient stock (3 available, 10 requested)',
        });
      });
    });

    describe('Happy path', () => {
      it('should return product with decreased stock when valid quantity and sufficient stock', () => {
        // Arrange
        const product = new Product(productId, description, initialStock, testDate);
        const quantity = 5;
        const expectedStock = initialStock - quantity;

        // Act
        const result = product.use(quantity);

        // Assert
        assert.strictEqual(result.stock, expectedStock);
        assert.strictEqual(result.id, productId);
        assert.strictEqual(result.description, description);
      });

      it('should return product with updated timestamp when using stock', () => {
        // Arrange
        const product = new Product(productId, description, initialStock, testDate);
        const quantity = 5;
        const beforeUse = new Date();

        // Act
        const result = product.use(quantity);

        // Assert
        assert.ok(result.updatedAt >= beforeUse, 'Timestamp should be updated');
        assert.strictEqual(result.id, productId);
        assert.strictEqual(result.description, description);
        assert.strictEqual(result.stock, initialStock - quantity);
      });

      it('should preserve immutability when using stock', () => {
        // Arrange
        const product = new Product(productId, description, initialStock, testDate);
        const quantity = 5;

        // Act
        const result = product.use(quantity);

        // Assert
        assert.notStrictEqual(result, product, 'Should return a new instance');
        assert.strictEqual(product.stock, initialStock, 'Original product should be unchanged');
      });

      it('should allow using all available stock', () => {
        // Arrange
        const product = new Product(productId, description, initialStock, testDate);

        // Act
        const result = product.use(initialStock);

        // Assert
        assert.strictEqual(result.stock, 0);
        assert.strictEqual(result.id, productId);
      });
    });
  });
});
