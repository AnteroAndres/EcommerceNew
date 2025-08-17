const { body } = require('express-validator');

// Validaciones para crear producto
const validateCreateProduct = [
  body('name')
    .notEmpty()
    .withMessage('El nombre del producto es requerido')
    .isLength({ min: 2, max: 100 })
    .withMessage('El nombre debe tener entre 2 y 100 caracteres')
    .trim(),

  body('description')
    .notEmpty()
    .withMessage('La descripción del producto es requerida')
    .isLength({ min: 10, max: 2000 })
    .withMessage('La descripción debe tener entre 10 y 2000 caracteres')
    .trim(),

  body('price')
    .notEmpty()
    .withMessage('El precio del producto es requerido')
    .isFloat({ min: 0 })
    .withMessage('El precio debe ser un número positivo'),

  body('originalPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('El precio original debe ser un número positivo'),

  body('category')
    .notEmpty()
    .withMessage('La categoría del producto es requerida')
    .trim(),

  body('subcategory')
    .optional()
    .trim(),

  body('brand')
    .optional()
    .trim(),

  body('stock')
    .notEmpty()
    .withMessage('El stock del producto es requerido')
    .isInt({ min: 0 })
    .withMessage('El stock debe ser un número entero positivo'),

  body('images')
    .optional()
    .isArray()
    .withMessage('Las imágenes deben ser un array'),

  body('images.*')
    .optional()
    .isString()
    .withMessage('Cada imagen debe ser una cadena de texto'),

  body('tags')
    .optional()
    .isArray()
    .withMessage('Las etiquetas deben ser un array'),

  body('tags.*')
    .optional()
    .isString()
    .withMessage('Cada etiqueta debe ser una cadena de texto'),

  body('specifications')
    .optional()
    .isObject()
    .withMessage('Las especificaciones deben ser un objeto'),

  body('isFeatured')
    .optional()
    .isBoolean()
    .withMessage('isFeatured debe ser un valor booleano'),

  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive debe ser un valor booleano')
];

// Validaciones para actualizar producto
const validateUpdateProduct = [
  body('name')
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage('El nombre debe tener entre 2 y 100 caracteres')
    .trim(),

  body('description')
    .optional()
    .isLength({ min: 10, max: 2000 })
    .withMessage('La descripción debe tener entre 10 y 2000 caracteres')
    .trim(),

  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('El precio debe ser un número positivo'),

  body('originalPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('El precio original debe ser un número positivo'),

  body('category')
    .optional()
    .trim(),

  body('subcategory')
    .optional()
    .trim(),

  body('brand')
    .optional()
    .trim(),

  body('stock')
    .optional()
    .isInt({ min: 0 })
    .withMessage('El stock debe ser un número entero positivo'),

  body('images')
    .optional()
    .isArray()
    .withMessage('Las imágenes deben ser un array'),

  body('images.*')
    .optional()
    .isString()
    .withMessage('Cada imagen debe ser una cadena de texto'),

  body('tags')
    .optional()
    .isArray()
    .withMessage('Las etiquetas deben ser un array'),

  body('tags.*')
    .optional()
    .isString()
    .withMessage('Cada etiqueta debe ser una cadena de texto'),

  body('specifications')
    .optional()
    .isObject()
    .withMessage('Las especificaciones deben ser un objeto'),

  body('isFeatured')
    .optional()
    .isBoolean()
    .withMessage('isFeatured debe ser un valor booleano'),

  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive debe ser un valor booleano')
];

// Validación personalizada para verificar que originalPrice > price cuando se proporciona
const validatePriceLogic = (req, res, next) => {
  const { price, originalPrice } = req.body;
  
  if (originalPrice && price && parseFloat(originalPrice) <= parseFloat(price)) {
    return res.status(400).json({
      success: false,
      message: 'El precio original debe ser mayor al precio actual'
    });
  }
  
  next();
};

module.exports = {
  validateCreateProduct,
  validateUpdateProduct,
  validatePriceLogic
};