// src/routes/product.router.js
import express from 'express';
import ProductManager from '../managers/product.manager.js';  // Importamos la clase con la extensión '.js'
const router = express.Router();
const productManager = new ProductManager();

// GET / - List all products with optional limit
router.get('/', async (req, res) => {
  const { limit } = req.query;
  try {
    const products = await productManager.getProducts();
    if (limit) {
      return res.json(products.slice(0, parseInt(limit)));
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving products' });
  }
});

// GET /:pid - Get product by ID
router.get('/:pid', async (req, res) => {
  const { pid } = req.params;
  try {
    const product = await productManager.getProductById(pid);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving product' });
  }
});

// POST / - Add a new product
router.post('/', async (req, res) => {
  const { title, description, code, price, stock, category, thumbnails, status } = req.body;
  if (!title || !description || !code || !price || !stock || !category) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const newProduct = await productManager.addProduct({
      title,
      description,
      code,
      price,
      stock,
      category,
      thumbnails: thumbnails || [],
      status: status !== undefined ? status : true,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error adding product' });
  }
});

// PUT /:pid - Update a product
router.put('/:pid', async (req, res) => {
  const { pid } = req.params;
  const updates = req.body;
  if (updates.id) {
    return res.status(400).json({ error: 'Cannot update product ID' });
  }
  try {
    const updatedProduct = await productManager.updateProduct(pid, updates);
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error updating product' });
  }
});

// DELETE /:pid - Delete a product
router.delete('/:pid', async (req, res) => {
  const { pid } = req.params;
  try {
    const deleted = await productManager.deleteProduct(pid);
    if (!deleted) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting product' });
  }
});

export default router;  // Exportamos el router como default
