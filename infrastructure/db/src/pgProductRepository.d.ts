import { Product } from "stock-management--domain/entities/Product.js";
import { ProductRepository } from "stock-management--domain/repositories/ProductRepository.js";
export declare class pgProductRepository implements ProductRepository {
    /**
     *
     */
    constructor();
    getById(id: string): Promise<Product | null>;
    update(product: Product): Promise<void>;
    list(): Promise<Product[]>;
}
