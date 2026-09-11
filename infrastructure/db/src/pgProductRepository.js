import { Product } from "stock-management--domain/entities/Product.js";
import { prisma } from "./lib/prisma.js";
export class pgProductRepository {
    /**
     *
     */
    constructor() {
    }
    getById(id) {
        throw new Error("Method not implemented.");
    }
    update(product) {
        throw new Error("Method not implemented.");
    }
    list() {
        return prisma.products.findMany().then((result) => result.map(p => toDTO(p)));
    }
}
function toDTO(p) {
    const product = new Product(p.id, p.description, 0, new Date());
    return product;
}
