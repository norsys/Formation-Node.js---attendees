import fs from 'node:fs/promises';

/**
 * 
 * @param {string} productId
 * @returns {Promise<any[]>}
 */
function getProducts() {
    return fs.readFile("../../data/products.json").then(JSON.parse);
}

// function saveProductsUpdating(product) {
//     const products = getProducts();
//     const otherProducts = products.filter(p => p.id ===! product.id);
//     const allProducts = [product, ...otherProducts];

//     fs.writeFile("../../data/products.json", JSON.stringify(allProducts));
// }

// function saveProductsUpdating(product) {
//     const products = getProducts();
//     const updated = products.map(p => p.id === product.id ? product : p)
//     fs.writeFile("../../data/products.json", JSON.stringify(updated));
// }

// export async function saveProductsUpdating(product) {
//     const products = await getProducts();
//     const productIndex = products.findIndex(p => p.id === product.id);

//     if (productIndex >= 0) {
//         products[productIndex] = product;
//         fs.writeFile("../../data/products.json", JSON.stringify(products));
//     }
// }

// export function saveProductsUpdating(product) {
//     return getProducts().then((products) => {
//         const productIndex = products.findIndex(p => p.id === product.id);

//         if (productIndex >= 0) {
//             products[productIndex] = product;
//             // return fs.writeFile("../../data/products.json", JSON.stringify(products));
//             return fs.writeFile("../../toto/products.json", JSON.stringify(products));
//         }
//     });
// }

export function saveProductsUpdating(product) {
    return getProducts()
        .then(products => ({ all: products, index: products.findIndex(p => p.id === product.id) }))
        .then(({ all, index }) => {
            if (index >= 0) {
                all[index] = product;
            }
            return all;
        })
        .then(products => JSON.stringify(products))
        .then(json => fs.writeFile("../../data/products.json", json));
}

/**
 * 
 * @param {string} productId 
 * @returns {Promise<any>}
 */
export function getProductById(productId) {
    return getProducts().then(products => {
        return products.find(t => t.id === productId) ?? Promise.reject(new Error("Non trouvé"))
    })
}

/**
 * 
 * @param {object} product
 * @param {number} additionalStock 
 * @return {object}
 */
export function addStockToProduct(product, additionalStock) {
    product.stock += additionalStock;
    product.updatedAt = new Date().toISOString();
    return product;
}