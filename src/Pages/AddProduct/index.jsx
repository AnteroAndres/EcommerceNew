import React, { useState } from 'react';
import { productService } from '../../services/api';

// Componente para el contenido de cada pestaña
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`product-tabpanel-${index}`}
      aria-labelledby={`product-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div className="py-6">
          {children}
        </div>
      )}
    </div>
  );
}

const AddProduct = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: '',
    subcategory: '',
    brand: '',
    stock: '',
    tags: [],
    specifications: {},
    isFeatured: false,
    isActive: true
  });

  const [currentTag, setCurrentTag] = useState('');
  const [specKey, setSpecKey] = useState('');
  const [specValue, setSpecValue] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const categories = [
    'Ropa',
    'Calzado',
    'Tecnología',
    'Hogar',
    'Deportes',
    'Belleza',
    'Libros',
    'Juguetes'
  ];

  const tabs = [
    { id: 0, label: 'Información General', color: 'text-rose-600 border-rose-500' },
    { id: 1, label: 'Precios y Detalles', color: 'text-amber-600 border-amber-500' },
    { id: 2, label: 'Imágenes y Config.', color: 'text-green-600 border-green-500' }
  ];

  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleAddSpecification = () => {
    if (specKey.trim() && specValue.trim()) {
      setFormData(prev => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [specKey.trim()]: specValue.trim()
        }
      }));
      setSpecKey('');
      setSpecValue('');
    }
  };

  const handleRemoveSpecification = (keyToRemove) => {
    setFormData(prev => ({
      ...prev,
      specifications: Object.fromEntries(
        Object.entries(prev.specifications).filter(([key]) => key !== keyToRemove)
      )
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validaciones básicas
      if (!formData.name || !formData.description || !formData.price || !formData.category || !formData.stock) {
        throw new Error('Por favor completa todos los campos requeridos');
      }

      if (parseFloat(formData.price) <= 0) {
        throw new Error('El precio debe ser mayor a 0');
      }

      if (parseInt(formData.stock) < 0) {
        throw new Error('El stock no puede ser negativo');
      }

      if (formData.originalPrice && parseFloat(formData.originalPrice) <= parseFloat(formData.price)) {
        throw new Error('El precio original debe ser mayor al precio actual');
      }

      // Preparar datos para envío
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
        stock: parseInt(formData.stock),
        images: images
      };

      const response = await productService.createProduct(productData);
      
      setSuccess('Producto creado exitosamente');
      
      // Limpiar formulario
      setFormData({
        name: '',
        description: '',
        price: '',
        originalPrice: '',
        category: '',
        subcategory: '',
        brand: '',
        stock: '',
        tags: [],
        specifications: {},
        isFeatured: false,
        isActive: true
      });
      setImages([]);
      
      // Limpiar el input de archivos
      const fileInput = document.getElementById('images-input');
      if (fileInput) fileInput.value = '';

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (activeTab < 2) {
      setActiveTab(activeTab + 1);
    }
  };

  const handlePrevious = () => {
    if (activeTab > 0) {
      setActiveTab(activeTab - 1);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
          Agregar Nuevo Producto
        </h1>

        {/* Alertas */}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{success}</p>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Pestañas */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? `${tab.color} border-current`
                    : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                }`}
                id={`product-tab-${tab.id}`}
                aria-controls={`product-tabpanel-${tab.id}`}
                role="tab"
                aria-selected={activeTab === tab.id}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <form onSubmit={handleSubmit}>
          {/* PESTAÑA 1: INFORMACIÓN GENERAL */}
          <TabPanel value={activeTab} index={0}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-rose-600 mb-6 flex items-center gap-2">
                  📋 Información Básica
                </h3>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 text-left">
                        Nombre del Producto
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500"
                        placeholder="Nombre del producto"
                      />
                      <p className="mt-1 text-xs text-gray-500">Ingresa el nombre completo del producto</p>
                    </div>

                    <div>
                      <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1 text-left">
                        Marca
                      </label>
                      <input
                        type="text"
                        id="brand"
                        name="brand"
                        value={formData.brand}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500"
                        placeholder="Marca del producto"
                      />
                      <p className="mt-1 text-xs text-gray-500">Marca o fabricante del producto</p>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1 text-left">
                      Descripción
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500"
                      placeholder="Describe las características principales del producto"
                    />
                    <p className="mt-1 text-xs text-gray-500">Describe las características principales del producto</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-rose-600 mb-6 flex items-center gap-2">
                  📂 Categorización
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1 text-left">
                      Categoría
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500"
                    >
                      <option value="">Selecciona una categoría</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700 mb-1 text-left">
                      Subcategoría
                    </label>
                    <input
                      type="text"
                      id="subcategory"
                      name="subcategory"
                      value={formData.subcategory}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500"
                      placeholder="Subcategoría (opcional)"
                    />
                    <p className="mt-1 text-xs text-gray-500">Especifica una subcategoría si aplica</p>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>

          {/* PESTAÑA 2: PRECIOS Y DETALLES */}
          <TabPanel value={activeTab} index={1}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                {/* Precios y Stock */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-amber-600 mb-6 flex items-center gap-2">
                    💰 Precios y Stock
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1 text-left">
                          Precio
                        </label>
                        <input
                          type="number"
                          id="price"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          required
                          min="0"
                          step="0.01"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                          placeholder="0.00"
                        />
                        <p className="mt-1 text-xs text-gray-500">Precio de venta actual</p>
                      </div>

                      <div>
                        <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-700 mb-1 text-left">
                          Precio Original
                        </label>
                        <input
                          type="number"
                          id="originalPrice"
                          name="originalPrice"
                          value={formData.originalPrice}
                          onChange={handleInputChange}
                          min="0"
                          step="0.01"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                          placeholder="0.00"
                        />
                        <p className="mt-1 text-xs text-gray-500">Precio antes del descuento</p>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1 text-left">
                        Stock
                      </label>
                      <input
                        type="number"
                        id="stock"
                        name="stock"
                        value={formData.stock}
                        onChange={handleInputChange}
                        required
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                        placeholder="0"
                      />
                      <p className="mt-1 text-xs text-gray-500">Cantidad disponible en inventario</p>
                    </div>
                  </div>
                </div>

                {/* Etiquetas */}
                <div>
                  <h3 className="text-xl font-semibold text-amber-600 mb-6 flex items-center gap-2">
                    🏷️ Etiquetas
                  </h3>
                  
                  <div className="mb-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                        className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                        placeholder="Nueva etiqueta"
                      />
                      <button 
                        type="button"
                        onClick={handleAddTag}
                        className="px-4 py-2 text-sm font-medium text-amber-700 bg-amber-100 border border-amber-300 rounded-md hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        Agregar
                      </button>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">Presiona Enter o click en Agregar</p>
                  </div>
                  
                  <div className="min-h-20 p-4 border-2 border-dashed border-gray-300 rounded-md">
                    {formData.tags.length === 0 ? (
                      <p className="text-center text-gray-500 text-sm py-4">
                        No hay etiquetas agregadas
                      </p>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {formData.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800 border border-amber-200"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => handleRemoveTag(tag)}
                              className="ml-2 inline-flex items-center p-0.5 rounded-full text-amber-600 hover:bg-amber-200 hover:text-amber-800 focus:outline-none"
                            >
                              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                {/* Especificaciones */}
                <div>
                  <h3 className="text-xl font-semibold text-amber-600 mb-6 flex items-center gap-2">
                    ⚙️ Especificaciones
                  </h3>
                  
                  <div className="mb-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={specKey}
                        onChange={(e) => setSpecKey(e.target.value)}
                        className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                        placeholder="Clave"
                      />
                      <input
                        type="text"
                        value={specValue}
                        onChange={(e) => setSpecValue(e.target.value)}
                        className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                        placeholder="Valor"
                      />
                      <button 
                        type="button"
                        onClick={handleAddSpecification}
                        className="px-4 py-2 text-sm font-medium text-amber-700 bg-amber-100 border border-amber-300 rounded-md hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <div className="min-h-48 p-4 border-2 border-dashed border-gray-300 rounded-md">
                    {Object.entries(formData.specifications).length === 0 ? (
                      <div className="text-center text-gray-500 text-sm py-8">
                        <p>No hay especificaciones agregadas</p>
                        <small className="text-xs">Ejemplo: Color: Rojo, Tamaño: XL</small>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(formData.specifications).map(([key, value]) => (
                          <span
                            key={key}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 border border-purple-200"
                          >
                            {key}: {value}
                            <button
                              type="button"
                              onClick={() => handleRemoveSpecification(key)}
                              className="ml-2 inline-flex items-center p-0.5 rounded-full text-purple-600 hover:bg-purple-200 hover:text-purple-800 focus:outline-none"
                            >
                              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>

          {/* PESTAÑA 3: IMÁGENES Y CONFIGURACIONES */}
          <TabPanel value={activeTab} index={2}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                {/* Imágenes */}
                <div>
                  <h3 className="text-xl font-semibold text-green-600 mb-6 flex items-center gap-2">
                    🖼️ Imágenes del Producto
                  </h3>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center min-h-48 flex flex-col justify-center hover:border-green-500 hover:bg-green-50 transition-colors">
                    <input
                      id="images-input"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <label htmlFor="images-input" className="cursor-pointer">
                      <div className="space-y-4">
                        <div className="text-6xl opacity-50">📷</div>
                        <button
                          type="button"
                          className="px-6 py-3 bg-green-100 text-green-700 border border-green-300 rounded-md font-medium hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                          Seleccionar Imágenes
                        </button>
                      </div>
                    </label>
                    
                    {images.length > 0 ? (
                      <div className="mt-4">
                        <p className="text-green-600 font-semibold">
                          ✅ {images.length} imagen(es) seleccionada(s)
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {images.map(img => img.name).join(', ')}
                        </p>
                      </div>
                    ) : (
                      <div className="mt-4">
                        <p className="text-gray-600">
                          Arrastra y suelta imágenes aquí
                        </p>
                        <small className="text-gray-500">o haz clic para seleccionar</small>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                {/* Configuraciones */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-green-600 mb-6 flex items-center gap-2">
                    ⚡ Configuraciones
                  </h3>
                  
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-6">
                    <div className="flex items-start space-x-3">
                      <div className="flex items-center h-5">
                        <input
                          id="isFeatured"
                          name="isFeatured"
                          type="checkbox"
                          checked={formData.isFeatured}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </div>
                      <div className="text-sm">
                        <label htmlFor="isFeatured" className="font-medium text-gray-900 cursor-pointer">
                          ⭐ Producto Destacado
                        </label>
                        <p className="text-gray-500">Aparecerá en la sección destacados</p>
                      </div>
                    </div>

                    <hr className="border-gray-200" />
                    
                    <div className="flex items-start space-x-3">
                      <div className="flex items-center h-5">
                        <input
                          id="isActive"
                          name="isActive"
                          type="checkbox"
                          checked={formData.isActive}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                      </div>
                      <div className="text-sm">
                        <label htmlFor="isActive" className="font-medium text-gray-900 cursor-pointer">
                          🟢 Producto Activo
                        </label>
                        <p className="text-gray-500">Visible para los clientes</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Resumen del producto */}
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <h4 className="text-lg font-semibold text-blue-800 mb-4">📊 Resumen del Producto</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Nombre:</span> {formData.name || 'Sin nombre'}</p>
                    <p><span className="font-medium">Categoría:</span> {formData.category || 'Sin categoría'}</p>
                    <p><span className="font-medium">Precio:</span> {formData.price ? `$${formData.price}` : 'Sin precio'}</p>
                    <p><span className="font-medium">Stock:</span> {formData.stock || '0'} unidades</p>
                    <p><span className="font-medium">Etiquetas:</span> {formData.tags.length} agregadas</p>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>

          {/* Navegación entre pestañas */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={activeTab === 0}
                className={`px-6 py-2 text-sm font-medium rounded-md border ${
                  activeTab === 0
                    ? 'text-gray-400 bg-gray-100 border-gray-200 cursor-not-allowed'
                    : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500'
                }`}
              >
                ← Anterior
              </button>

              <div className="text-sm text-gray-500">
                Paso {activeTab + 1} de 3
              </div>

              <div className="flex gap-3">
                {activeTab < 2 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Siguiente →
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => window.history.back()}
                      className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className={`px-6 py-2 text-sm font-medium rounded-md border ${
                        loading
                          ? 'text-gray-400 bg-gray-100 border-gray-200 cursor-not-allowed'
                          : 'text-white bg-green-600 border-transparent hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500'
                      } flex items-center gap-2`}
                    >
                      {loading && (
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      )}
                      {loading ? 'Creando...' : '✨ Crear Producto'}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;