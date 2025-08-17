const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

// Datos de ejemplo para productos
const sampleProducts = [
  {
    name: "Camisa Casual Hombre",
    description: "Camisa casual de algodón 100% para hombre, perfecta para uso diario. Diseño moderno y cómodo con corte regular.",
    price: 45.99,
    originalPrice: 65.99,
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
    isActive: true
  },
  {
    name: "Jeans Slim Fit Mujer",
    description: "Jeans de corte slim fit para mujer, fabricados con denim de alta calidad. Diseño moderno que realza la figura.",
    price: 79.99,
    originalPrice: 99.99,
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
    isActive: true
  },
  {
    name: "Zapatillas Deportivas",
    description: "Zapatillas deportivas unisex ideales para running y actividades físicas. Suela antideslizante y diseño ergonómico.",
    price: 89.99,
    originalPrice: 120.00,
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
    isActive: true
  },
  {
    name: "Vestido Elegante",
    description: "Vestido elegante para ocasiones especiales. Diseño sofisticado con detalles únicos que realzan la feminidad.",
    price: 125.99,
    originalPrice: 159.99,
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
    isActive: true
  },
  {
    name: "Chaqueta de Cuero",
    description: "Chaqueta de cuero genuino para hombre. Estilo clásico atemporal que nunca pasa de moda.",
    price: 199.99,
    originalPrice: 299.99,
    category: "Ropa",
    subcategory: "Chaquetas",
    brand: "Leather Pro",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400"
    ],
    stock: 5,
    rating: {
      average: 4.6,
      count: 8
    },
    specifications: {
      "Material": "100% Cuero genuino",
      "Talla": "S, M, L, XL",
      "Color": "Negro, Marrón",
      "Forro": "Poliéster"
    },
    tags: ["chaqueta", "cuero", "hombre", "clásico"],
    isFeatured: false,
    isActive: true
  },
  {
    name: "Reloj Inteligente",
    description: "Reloj inteligente con múltiples funciones: monitor de salud, GPS, resistente al agua y batería de larga duración.",
    price: 249.99,
    originalPrice: 349.99,
    category: "Tecnología",
    subcategory: "Wearables",
    brand: "TechWatch",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
    ],
    stock: 20,
    rating: {
      average: 4.4,
      count: 67
    },
    specifications: {
      "Pantalla": "1.4 pulgadas AMOLED",
      "Batería": "Hasta 7 días",
      "Resistencia": "IP68",
      "Conectividad": "Bluetooth 5.0, WiFi"
    },
    tags: ["reloj", "inteligente", "tecnología", "fitness"],
    isFeatured: true,
    isActive: true
  }
];

// Función para insertar datos de ejemplo
const seedDatabase = async () => {
  try {
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce');
    console.log('✅ Conectado a MongoDB');

    // Limpiar productos existentes (opcional)
    await Product.deleteMany({});
    console.log('🗑️ Productos existentes eliminados');

    // Insertar productos de ejemplo
    const insertedProducts = await Product.insertMany(sampleProducts);
    console.log(`✅ ${insertedProducts.length} productos insertados exitosamente`);

    // Mostrar productos insertados
    insertedProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - $${product.price}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error insertando datos:', error);
    process.exit(1);
  }
};

// Ejecutar si se llama directamente
if (require.main === module) {
  seedDatabase();
}

module.exports = { sampleProducts, seedDatabase };