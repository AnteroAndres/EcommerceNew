const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getFeaturedProducts
} = require('../controllers/productControllerMemory');
const { upload, handleMulterError } = require('../middleware/upload');
const {
  validateCreateProduct,
  validateUpdateProduct,
  validatePriceLogic
} = require('../middleware/validation');

// @route   GET /api/products/featured
// @desc    Obtener productos destacados
// @access  Public
router.get('/featured', getFeaturedProducts);

// @route   GET /api/products
// @desc    Obtener todos los productos con filtros y paginación
// @access  Public
router.get('/', getProducts);

// @route   GET /api/products/:id
// @desc    Obtener un producto por ID
// @access  Public
router.get('/:id', getProductById);

// @route   POST /api/products
// @desc    Crear un nuevo producto
// @access  Private (Admin) - Por ahora público para pruebas
router.post(
  '/',
  upload.array('images', 5), // Permitir hasta 5 imágenes
  handleMulterError,
  validateCreateProduct,
  validatePriceLogic,
  createProduct
);

// @route   PUT /api/products/:id
// @desc    Actualizar un producto
// @access  Private (Admin) - Por ahora público para pruebas
router.put(
  '/:id',
  upload.array('images', 5),
  handleMulterError,
  validateUpdateProduct,
  validatePriceLogic,
  updateProduct
);

// @route   DELETE /api/products/:id
// @desc    Eliminar un producto
// @access  Private (Admin) - Por ahora público para pruebas
router.delete('/:id', deleteProduct);

module.exports = router;