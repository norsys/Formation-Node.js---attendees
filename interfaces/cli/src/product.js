import fs from 'node:fs/promises';

/**
 * 
 * @param {string} productId
 * @returns {Promise<any[]>}
 */
function getProducts() {
    return fs.readFile("../../data/products.json").then(JSON.parse);
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