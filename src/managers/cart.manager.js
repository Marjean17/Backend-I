// src/managers/cart.manager.js
import fs from 'fs/promises';  // Usamos la versión con promesas de fs
import crypto from 'crypto';

const path = './data/carts.json';

class CartManager {
  async getCarts() {
    try {
      const data = await fs.readFile(path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async getCartById(id) {
    const carts = await this.getCarts();
    return carts.find(cart => cart.id === id);
  }

  async createCart() {
    const carts = await this.getCarts();
    const newCart = {
      id: crypto.randomUUID(), // Generate a unique ID for the cart
      products: [],
    };

    carts.push(newCart);
    await fs.writeFile(path, JSON.stringify(carts, null, 2));
    return newCart;
  }

  async addProductToCart(cartId, productId) {
    const carts = await this.getCarts();
    const cartIndex = carts.findIndex(cart => cart.id === cartId);
    if (cartIndex === -1) return null;

    const cart = carts[cartIndex];
    const productIndex = cart.products.findIndex(p => p.product === productId);

    if (productIndex === -1) {
      cart.products.push({ product: productId, quantity: 1 });
    } else {
      cart.products[productIndex].quantity += 1;
    }

    carts[cartIndex] = cart;
    await fs.writeFile(path, JSON.stringify(carts, null, 2));
    return cart;
  }
}

export default CartManager;  // Exportamos la clase como default
