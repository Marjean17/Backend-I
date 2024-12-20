// src/managers/product.manager.js
import fs from 'fs/promises';  // Importamos fs.promises usando la sintaxis ES Modules
import crypto from 'crypto';    // Importamos crypto
const path = './data/products.json';

class ProductManager {
  async getProducts() {
    try {
      const data = await fs.readFile(path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async getProductById(id) {
    const products = await this.getProducts();
    return products.find(product => product.id === id);
  }

  async addProduct({ title, description, code, price, stock, category, thumbnails, status }) {
    const products = await this.getProducts();
    const newProduct = {
      id: crypto.randomUUID(), // Generate a unique ID for the product
      title,
      description,
      code,
      price,
      stock,
      category,
      thumbnails,
      status,
    };

    products.push(newProduct);
    await fs.writeFile(path, JSON.stringify(products, null, 2));
    return newProduct;
  }

  async updateProduct(id, updates) {
    const products = await this.getProducts();
    const index = products.findIndex(product => product.id === id);
    if (index === -1) return null;

    products[index] = { ...products[index], ...updates };
    await fs.writeFile(path, JSON.stringify(products, null, 2));
    return products[index];
  }

  async deleteProduct(id) {
    const products = await this.getProducts();
    const filteredProducts = products.filter(product => product.id !== id);
    if (products.length === filteredProducts.length) return false;

    await fs.writeFile(path, JSON.stringify(filteredProducts, null, 2));
    return true;
  }
}

export default ProductManager;  // Exportamos la clase ProductManager como default
