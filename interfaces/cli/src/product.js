import fs from 'node:fs/promises';
import path from 'node:path';


//const FILE_PATH = process.env.filepath ?? Promise.reject(new Error("missing file path"))

const FILE_PATH = getFilePath()

function getFilePath(){
    if(process.env.filepath) return process.env.filepath
    throw new Error("missing filepath")
}

/**
 * 
 * @param {string} productId
 * @returns {Promise<any[]>}
 */
export function getProducts() {
    return fs.readFile(FILE_PATH).then(JSON.parse);
}

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
        .then(json => fs.writeFile(FILE_PATH, json));
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
}

export function useStockProduct(product, stockToUse) {
    if (product.stock >= stockToUse) {
        product.stock -= stockToUse;

        product.updatedAt = new Date().toISOString();
    }
    else {
        throw new Error("Quantité insuffisante");
    }
}


export function writeToCSV(filePath, products) {
    const productsCSV = [`id;description;stock;updatedAt\r\n`, ...products.map(toCSVLine)];
    const dirname = path.dirname(filePath)
    return fs.mkdir(dirname, { recursive: true }).then(() => 
    fs.writeFile(filePath, productsCSV));
}

function toCSVLine({id, description, stock, updatedAt}) {
    return `${id};${description};${stock};${updatedAt}\r\n`
}


// function saveProductsUpdating(product) {
//     const products = getProducts();
//     const otherProducts = products.filter(p => p.id ===! product.id);
//     const allProducts = [product, ...otherProducts];

//     fs.writeFile(FILE_PATH, JSON.stringify(allProducts));
// }

// function saveProductsUpdating(product) {
//     const products = getProducts();
//     const updated = products.map(p => p.id === product.id ? product : p)
//     fs.writeFile(FILE_PATH, JSON.stringify(updated));
// }

// export async function saveProductsUpdating(product) {
//     const products = await getProducts();
//     const productIndex = products.findIndex(p => p.id === product.id);

//     if (productIndex >= 0) {
//         products[productIndex] = product;
//         fs.writeFile(FILE_PATH, JSON.stringify(products));
//     }
// }

// export function saveProductsUpdating(product) {
//     return getProducts().then((products) => {
//         const productIndex = products.findIndex(p => p.id === product.id);

//         if (productIndex >= 0) {
//             products[productIndex] = product;
//             // return fs.writeFile(FILE_PATH, JSON.stringify(products));
//             return fs.writeFile("../../toto/products.json", JSON.stringify(products));
//         }
//     });
// }
