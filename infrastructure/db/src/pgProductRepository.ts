import { Product } from "stock-management--domain/entities/Product.js";
import { ProductRepository } from "stock-management--domain/repositories/ProductRepository.js";
import { prisma } from "./lib/prisma.js";

export class pgProductRepository implements ProductRepository {

    /**
     *
     */
    constructor() {

    }

    getById(id: string): Promise<Product | null> {
        throw new Error("Method not implemented.");
    }
    update(product: Product): Promise<void> {
        throw new Error("Method not implemented.");
    }
    list(): Promise<Product[]> {
        return prisma.products.findMany().then((result: any[]) => result.map(p => toDTO(p)));
    }

}
function toDTO(p: { id: string; description: string; }): Product {
    const product = new Product(p.id, p.description, 0, new Date());
    return product;
}

