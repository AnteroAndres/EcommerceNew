import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import Rating from '@mui/material/Rating';

const ProductItem = () => {
  return (
    <div className="productItem shadow-lg rounded-md overflow-hidden border-1 border-gray-200">
      <div className="imgWrapper w-full h-[220px] overflow-hidden rounded-md relative">
        <img
          src="https://api.spicezgold.com/download/file_1734690981297_011618e4-4682-4123-be80-1fb7737d34ad1714702040213RARERABBITMenComfortOpaqueCasualShirt1.jpg"
          className="w-full"
        />
        <span className="discount flex items-center absolute top-[10px] left-[10px] z-50 bg-primary text-white rounded-md">
          -50%
        </span>
      </div>
      <div className="p-2">
        <h6 className="text-sm text-gray-500"><Link to="/" className="hover:text-primary transition-all duration-300">Camisa de hombre</Link></h6>
        <h3 className="text-sm text-black mb-1">
          <Link to="/" className="hover:text-primary transition-all duration-300 link-hover">
            Camisa Marron tela piqué
          </Link>
        </h3>
        <Rating name="size-small" defaultValue={4} size="small" readOnly />

        <div className="flex items-center gap-4">
          <span className="oldPrice line-through text-gray-500 text-sm font-[500]">
              $100
          </span>
          <span className="price text-primary text-sm font-[500]">
              $50
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
