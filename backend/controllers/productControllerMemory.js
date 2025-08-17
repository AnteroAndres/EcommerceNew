const { validationResult } = require('express-validator');

// Datos en memoria para pruebas (simulando base de datos)
let products = [
  {
    _id: '1',
    name: "Camisa Casual Hombre",
    description: "Camisa casual de algodón 100% para hombre, perfecta para uso diario. Diseño moderno y cómodo con corte regular.",
    price: 45.99,
    originalPrice: 65.99,
    discount: 30,
    category: "Ropa",
    subcategory: "Camisas",
    brand: "Fashion Brand",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400"
    ],
    stock: 25,
    rating: {
      average: 4.2,
      count: 18
    },
    specifications: {
      "Material": "100% Algodón",
      "Talla": "S, M, L, XL",
      "Color": "Azul, Blanco, Negro",
      "Cuidado": "Lavado a máquina"
    },
    tags: ["casual", "algodón", "hombre", "camisa"],
    isFeatured: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '2',
    name: "Jeans Slim Fit Mujer",
    description: "Jeans de corte slim fit para mujer, fabricados con denim de alta calidad. Diseño moderno que realza la figura.",
    price: 79.99,
    originalPrice: 99.99,
    discount: 20,
    category: "Ropa",
    subcategory: "Pantalones",
    brand: "Denim Co",
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400"
    ],
    stock: 15,
    rating: {
      average: 4.5,
      count: 32
    },
    specifications: {
      "Material": "98% Algodón, 2% Elastano",
      "Talla": "XS, S, M, L, XL",
      "Color": "Azul oscuro, Negro",
      "Corte": "Slim Fit"
    },
    tags: ["jeans", "slim fit", "mujer", "denim"],
    isFeatured: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '3',
    name: "Zapatillas Deportivas",
    description: "Zapatillas deportivas unisex ideales para running y actividades físicas. Suela antideslizante y diseño ergonómico.",
    price: 89.99,
    originalPrice: 120.00,
    discount: 25,
    category: "Calzado",
    subcategory: "Deportivo",
    brand: "SportMax",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400"
    ],
    stock: 30,
    rating: {
      average: 4.7,
      count: 45
    },
    specifications: {
      "Material": "Sintético y malla",
      "Talla": "36-45",
      "Color": "Blanco/Negro, Azul/Blanco",
      "Suela": "Goma antideslizante"
    },
    tags: ["zapatillas", "deportivo", "running", "unisex"],
    isFeatured: false,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '4',
    name: "Vestido Elegante",
    description: "Vestido elegante para ocasiones especiales. Diseño sofisticado con detalles únicos que realzan la feminidad.",
    price: 125.99,
    originalPrice: 159.99,
    discount: 21,
    category: "Ropa",
    subcategory: "Vestidos",
    brand: "Elegant Style",
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400"
    ],
    stock: 8,
    rating: {
      average: 4.8,
      count: 12
    },
    specifications: {
      "Material": "Poliéster y Elastano",
      "Talla": "XS, S, M, L",
      "Color": "Negro, Azul marino, Rojo",
      "Ocasión": "Formal, Fiesta"
    },
    tags: ["vestido", "elegante", "formal", "mujer"],
    isFeatured: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

let nextId = 5;

// @desc    Obtener todos los productos
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    // Filtrar productos activos
    let filteredProducts = products.filter(product => product.isActive);

    // Aplicar filtros
    if (req.query.category) {
      const categoryRegex = new RegExp(req.query.category, 'i');
      filteredProducts = filteredProducts.filter(product => 
        categoryRegex.test(product.category)
      );
    }
    
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, 'i');
      filteredProducts = filteredProducts.filter(product => 
        searchRegex.test(product.name) || searchRegex.test(product.description)
      );
    }
    
    if (req.query.minPrice || req.query.maxPrice) {
      filteredProducts = filteredProducts.filter(product => {
        const price = product.price;
        const minPrice = req.query.minPrice ? parseFloat(req.query.minPrice) : 0;
        const maxPrice = req.query.maxPrice ? parseFloat(req.query.maxPrice) : Infinity;
        return price >= minPrice && price <= maxPrice;
      });
    }

    // Ordenamiento
    switch (req.query.sortBy) {
      case 'price_asc':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name_asc':
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name_desc':
        filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'rating':
        filteredProducts.sort((a, b) => b.rating.average - a.rating.average);
        break;
      default:
        filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    // Paginación
    const paginatedProducts = filteredProducts.slice(skip, skip + limit);
    const total = filteredProducts.length;

    res.json({
      success: true,
      data: paginatedProducts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error obteniendo productos:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// @desc    Obtener un producto por ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = products.find(p => p._id === req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Error obteniendo producto:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// @desc    Crear un nuevo producto
// @route   POST /api/products
// @access  Private (Admin)
const createProduct = async (req, res) => {
  try {
    // Verificar errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Datos de entrada inválidos',
        errors: errors.array()
      });
    }

    // Procesar imágenes subidas
    const images = [];
    if (req.files && req.files.length > 0) {
      req.files.forEach(file => {
        images.push(`/uploads/${file.filename}`);
      });
    }

    // Calcular descuento si se proporciona precio original
    let discount = 0;
    if (req.body.originalPrice && req.body.price) {
      discount = Math.round(((parseFloat(req.body.originalPrice) - parseFloat(req.body.price)) / parseFloat(req.body.originalPrice)) * 100);
    }

    // Procesar especificaciones si vienen como string
    let specifications = {};
    if (req.body.specifications) {
      if (typeof req.body.specifications === 'string') {
        try {
          specifications = JSON.parse(req.body.specifications);
        } catch (e) {
          specifications = {};
        }
      } else {
        specifications = req.body.specifications;
      }
    }

    // Procesar tags si vienen como string
    let tags = [];
    if (req.body.tags) {
      if (typeof req.body.tags === 'string') {
        try {
          tags = JSON.parse(req.body.tags);
        } catch (e) {
          tags = [];
        }
      } else if (Array.isArray(req.body.tags)) {
        tags = req.body.tags;
      }
    }

    const newProduct = {
      _id: nextId.toString(),
      name: req.body.name,
      description: req.body.description,
      price: parseFloat(req.body.price),
      originalPrice: req.body.originalPrice ? parseFloat(req.body.originalPrice) : undefined,
      discount,
      category: req.body.category,
      subcategory: req.body.subcategory || '',
      brand: req.body.brand || '',
      images: images.length > 0 ? images : ['https://via.placeholder.com/400x300?text=No+Image'],
      stock: parseInt(req.body.stock),
      rating: {
        average: 0,
        count: 0
      },
      specifications,
      tags,
      isActive: req.body.isActive !== undefined ? req.body.isActive : true,
      isFeatured: req.body.isFeatured || false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    products.push(newProduct);
    nextId++;

    res.status(201).json({
      success: true,
      message: 'Producto creado exitosamente',
      data: newProduct
    });
  } catch (error) {
    console.error('Error creando producto:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// @desc    Actualizar un producto
// @route   PUT /api/products/:id
// @access  Private (Admin)
const updateProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Datos de entrada inválidos',
        errors: errors.array()
      });
    }

    const productIndex = products.findIndex(p => p._id === req.params.id);

    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    // Procesar nuevas imágenes si se subieron
    if (req.files && req.files.length > 0) {
      const newImages = [];
      req.files.forEach(file => {
        newImages.push(`/uploads/${file.filename}`);
      });
      req.body.images = [...(products[productIndex].images || []), ...newImages];
    }

    // Calcular descuento si se actualiza el precio
    if (req.body.originalPrice && req.body.price) {
      req.body.discount = Math.round(((req.body.originalPrice - req.body.price) / req.body.originalPrice) * 100);
    }

    // Actualizar producto
    products[productIndex] = {
      ...products[productIndex],
      ...req.body,
      updatedAt: new Date()
    };

    res.json({
      success: true,
      message: 'Producto actualizado exitosamente',
      data: products[productIndex]
    });
  } catch (error) {
    console.error('Error actualizando producto:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// @desc    Eliminar un producto
// @route   DELETE /api/products/:id
// @access  Private (Admin)
const deleteProduct = async (req, res) => {
  try {
    const productIndex = products.findIndex(p => p._id === req.params.id);

    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    products.splice(productIndex, 1);

    res.json({
      success: true,
      message: 'Producto eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error eliminando producto:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// @desc    Obtener productos destacados
// @route   GET /api/products/featured
// @access  Public
const getFeaturedProducts = async (req, res) => {
  try {
    const featuredProducts = products
      .filter(product => product.isActive && product.isFeatured)
      .sort((a, b) => b.rating.average - a.rating.average)
      .slice(0, 8);

    res.json({
      success: true,
      data: featuredProducts
    });
  } catch (error) {
    console.error('Error obteniendo productos destacados:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getFeaturedProducts
};