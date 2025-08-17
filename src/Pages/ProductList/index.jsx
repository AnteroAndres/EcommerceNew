import React, { useState, useEffect } from "react";
import SideBar from "../../components/SiderBar";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import ProductItem from "../../components/ProductItem";
import { CustomButton } from "../../components/ui/CustomMUI";
import { IoGrid } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Button, CircularProgress, Alert } from "@mui/material";
import { productService } from "../../services/api";

const ProductList = () => {
  const [itemView, setItemView] = useState("grid");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('');
  
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSortChange = (sortOption) => {
    setSortBy(sortOption);
    handleClose();
    fetchProducts({ sortBy: sortOption });
  };

  // Función para obtener productos del backend
  const fetchProducts = async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await productService.getProducts(params);
      setProducts(response.data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  // Cargar productos al montar el componente
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <section className="py-5">
      <div className="container">
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            color="inherit"
            href="/"
            className="link transition"
          >
            Home
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href="/material-ui/getting-started/installation/"
            className="link transition"
          >
            Fashion
          </Link>
        </Breadcrumbs>
      </div>
      <div className="bg-white p-2 mt-4">
        <div className="container flex gap-3">
          <div className="sidebarWrapper w-[20%] h-full bg-white">
            <SideBar />
          </div>
          <div className="rightContent w-[80%]">
            <div className="bg-[#f1f1f1] p-2 w-full mb-3 rounded-md flex items-center justify-between">
              <div className="col1 flex items-center gap-1">
                <CustomButton
                  className={`w-[80px] h-[40px] min-w-[40px] text-[#000] !rounded-full hover:bg-gray-200 ${itemView === 'grid' ? 'bg-blue-100 border-2 border-blue-300' : ''}`}
                  onClick={() => setItemView('grid')}
                >
                  <IoGrid className="text-[20px]" />
                </CustomButton>
                <CustomButton
                  className={`w-[80px] h-[40px] min-w-[40px] text-[#000] !rounded-full hover:bg-gray-200 ${itemView === 'list' ? 'bg-blue-100 border-2 border-blue-300' : ''}`}
                  onClick={() => setItemView('list')}
                >
                  <IoMenu className="text-[20px]" />
                </CustomButton>
              </div>
              <div className="col2 ml-auto flex items-center justify-end">
                <span className="text-[14px] font-[500] pl-3 text-[#000]">
                  Filtros:
                </span>
              </div>
              <div className="col2 ml-auto flex items-center justify-end">
                <span className="text-[14px] font-[500] pl-3 text-[#000]">
                  Short By:
                </span>
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  className="!text-[#000] !rounded-full !bg-[#f1f1f1] hover:bg-gray-200 !h-[40px] !w-[120px] !min-w-[40px]"
                >
                  {sortBy || 'Ordenar'}
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  slotProps={{
                    list: {
                      "aria-labelledby": "basic-button",
                    },
                  }}
                >
                  <MenuItem onClick={() => handleSortChange('rating')}>
                    Mejor calificados
                  </MenuItem>
                  <MenuItem onClick={() => handleSortChange('price_asc')}>
                    Precio: menor a mayor
                  </MenuItem>
                  <MenuItem onClick={() => handleSortChange('price_desc')}>
                    Precio: mayor a menor
                  </MenuItem>
                  <MenuItem onClick={() => handleSortChange('name_asc')}>
                    Nombre: A a Z
                  </MenuItem>
                  <MenuItem onClick={() => handleSortChange('name_desc')}>
                    Nombre: Z a A
                  </MenuItem>
                  <MenuItem onClick={() => handleSortChange('')}>
                    Más recientes
                  </MenuItem>
                </Menu>
              </div>
            </div>
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <CircularProgress />
                <span className="ml-2">Cargando productos...</span>
              </div>
            ) : error ? (
              <Alert severity="error" className="mb-4">
                {error}
              </Alert>
            ) : (
              <div className={itemView === 'grid' ?
                "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" :
                "flex flex-col gap-3"
              }>
                {products.length > 0 ? (
                  products.map((product) => (
                    <ProductItem
                      key={product._id}
                      product={product}
                      viewType={itemView}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center py-8">
                    <p className="text-gray-500">No se encontraron productos</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductList;
