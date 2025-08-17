import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { FaRegHeart } from "react-icons/fa";
import { IoGitCompareOutline } from "react-icons/io5";
import { MdZoomOutMap } from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";
import { CircularActionButton } from "../ui/CustomButton";

const ProductItem = ({ product, viewType = "grid" }) => {
  if (!product) return null;

  const {
    _id,
    name,
    description,
    price,
    originalPrice,
    discount,
    images,
    rating,
    brand,
    category
  } = product;

  const displayImage = images && images.length > 0 ? images[0] : 'https://via.placeholder.com/400x300?text=No+Image';

  return (
    <div
      className={`productItem shadow-lg rounded-md overflow-hidden border-1 border-gray-200 ${
        viewType === "list" ? "flex flex-row gap-4 p-4" : ""
      }`}
    >
      <div
        className={`group imgWrapper overflow-hidden rounded-md relative ${
          viewType === "list"
            ? "w-[200px] h-[150px] flex-shrink-0"
            : "w-full h-[220px]"
        }`}
      >
        <Link to={`/product/${_id}`}>
          <div
            className={`img overflow-hidden ${
              viewType === "list" ? "h-[150px]" : "h-[220px]"
            }`}
          >
            <img
              src={displayImage}
              alt={name}
              className="w-full h-full object-cover"
            />
            {images && images.length > 1 && (
              <img
                src={images[1]}
                alt={name}
                className="w-full h-full object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
              />
            )}
          </div>
        </Link>
        {discount > 0 && (
          <span className="discount flex items-center absolute top-[10px] left-[10px] z-50 bg-primary text-white rounded-lg p-1 text-[12px] font-[500]">
            -{discount}%
          </span>
        )}
        <div className="actions absolute top-[-200px] right-[5px] z-50 flex items-center gap-2 flex-col w-[50px] transition-all duration-300 group-hover:top-[15px] opacity-0 group-hover:opacity-100">
          <Tooltip title="Zoom" placement="left-start">
            <CircularActionButton>
              <MdZoomOutMap />
            </CircularActionButton>
          </Tooltip>
          <Tooltip title="Compare" placement="left-start">
            <CircularActionButton>
              <IoGitCompareOutline />
            </CircularActionButton>
          </Tooltip>
          <Tooltip title="Wishlist" placement="left-start">
            <CircularActionButton>
              <FaRegHeart />
            </CircularActionButton>
          </Tooltip>
        </div>
      </div>
      <div className={`${viewType === "list" ? "flex-1 py-2" : "p-2"}`}>
        <h6 className="text-sm text-gray-500 text-left">
          <Link
            to={`/product/${_id}`}
            className="hover:text-primary transition-all duration-300"
          >
            {category}
          </Link>
        </h6>
        <h3 className="text-sm text-black mb-1 text-left">
          <Link
            to={`/product/${_id}`}
            className="hover:text-primary transition-all duration-300 link-hover"
          >
            {name}
          </Link>
        </h3>
        <div className="w-full text-left">
          {rating && (
            <Rating 
              name="size-small" 
              value={rating.average || 0} 
              size="small" 
              readOnly 
              precision={0.1}
            />
          )}
        </div>
        <div className="flex items-center gap-4">
          {originalPrice && originalPrice > price && (
            <span className="oldPrice line-through text-gray-500 text-sm font-[500]">
              ${originalPrice.toFixed(2)}
            </span>
          )}
          <span className="price text-primary text-sm font-[500]">
            ${price.toFixed(2)}
          </span>
        </div>
        {brand && (
          <p className="text-xs text-gray-400 mt-1">
            Marca: {brand}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
