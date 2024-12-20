// src/routes/cart.router.js
import express from 'express';
const router = express.Router();
import CartManager from '../managers/cart.manager.js'; // Asegúrate de usar la extensión .js si estás usando módulos ES
const cartManager = new CartManager();

// POST / - Create a new cart
router.post('/', async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: 'Error creating cart' });
  }
});

// GET /:cid - Get products in a cart by cart ID
router.get('/:cid', async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartManager.getCartById(cid);
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    res.json(cart.products);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving cart' });
  }
});

// POST /:cid/product/:pid - Add product to a cart
router.post('/:cid/product/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const updatedCart = await cartManager.addProductToCart(cid, pid);
    if (!updatedCart) {
      return res.status(404).json({ error: 'Cart or product not found' });
    }
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: 'Error adding product to cart' });
  }
});

// Usar export default en lugar de module.exports
export default router;
