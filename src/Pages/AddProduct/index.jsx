import React, { useState } from 'react';
import {
  TextField,
  Button,
  Paper,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Box,
  Alert,
  CircularProgress,
  Switch,
  FormControlLabel
} from '@mui/material';
import { productService } from '../../services/api';

const AddProduct = () => {
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

  return (
    <div className="container mx-auto py-8 px-4">
      <Paper elevation={3} className="p-6">
        <Typography variant="h4" component="h1" gutterBottom>
          Agregar Nuevo Producto
        </Typography>

        {success && (
          <Alert severity="success" className="mb-4">
            {success}
          </Alert>
        )}

        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Información básica */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Información Básica
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nombre del Producto *"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Marca"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Descripción *"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </Grid>

            {/* Categorización */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Categorización
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Categoría</InputLabel>
                <Select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  label="Categoría"
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Subcategoría"
                name="subcategory"
                value={formData.subcategory}
                onChange={handleInputChange}
              />
            </Grid>

            {/* Precios y stock */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Precios y Stock
              </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="number"
                label="Precio *"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                inputProps={{ min: 0, step: 0.01 }}
                required
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="number"
                label="Precio Original"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleInputChange}
                inputProps={{ min: 0, step: 0.01 }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="number"
                label="Stock *"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                inputProps={{ min: 0 }}
                required
              />
            </Grid>

            {/* Etiquetas */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Etiquetas
              </Typography>
              <Box display="flex" gap={1} mb={2}>
                <TextField
                  label="Nueva etiqueta"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                />
                <Button variant="outlined" onClick={handleAddTag}>
                  Agregar
                </Button>
              </Box>
              <Box display="flex" flexWrap="wrap" gap={1}>
                {formData.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => handleRemoveTag(tag)}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            </Grid>

            {/* Especificaciones */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Especificaciones
              </Typography>
              <Box display="flex" gap={1} mb={2}>
                <TextField
                  label="Clave"
                  value={specKey}
                  onChange={(e) => setSpecKey(e.target.value)}
                />
                <TextField
                  label="Valor"
                  value={specValue}
                  onChange={(e) => setSpecValue(e.target.value)}
                />
                <Button variant="outlined" onClick={handleAddSpecification}>
                  Agregar
                </Button>
              </Box>
              <Box>
                {Object.entries(formData.specifications).map(([key, value]) => (
                  <Chip
                    key={key}
                    label={`${key}: ${value}`}
                    onDelete={() => handleRemoveSpecification(key)}
                    color="secondary"
                    variant="outlined"
                    style={{ margin: '2px' }}
                  />
                ))}
              </Box>
            </Grid>

            {/* Imágenes */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Imágenes
              </Typography>
              <input
                id="images-input"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                style={{ marginBottom: '16px' }}
              />
              {images.length > 0 && (
                <Typography variant="body2" color="textSecondary">
                  {images.length} imagen(es) seleccionada(s)
                </Typography>
              )}
            </Grid>

            {/* Configuraciones */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Configuraciones
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isFeatured}
                    onChange={handleInputChange}
                    name="isFeatured"
                  />
                }
                label="Producto destacado"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    name="isActive"
                  />
                }
                label="Producto activo"
              />
            </Grid>

            {/* Botones */}
            <Grid item xs={12}>
              <Box display="flex" gap={2} justifyContent="flex-end">
                <Button
                  type="button"
                  variant="outlined"
                  onClick={() => window.history.back()}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  startIcon={loading && <CircularProgress size={20} />}
                >
                  {loading ? 'Creando...' : 'Crear Producto'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
};

export default AddProduct;