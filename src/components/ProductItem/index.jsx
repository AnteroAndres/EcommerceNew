import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { Button } from "@mui/material";
import { FaRegHeart } from "react-icons/fa";
import { IoGitCompareOutline } from "react-icons/io5";
import { MdZoomOutMap } from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";

const ProductItem = () => {
  return (
    <div className="productItem shadow-lg rounded-md overflow-hidden border-1 border-gray-200">
      <div className="group imgWrapper w-full h-[220px] overflow-hidden rounded-md relative">
        <Link to="/">
          <div className="img h-[220px] overflow-hidden">
            <img
              src="https://serviceapi.spicezgold.com/download/1742453130877_vbvb1.jpg"
              className="w-full"
            />
            <img
              src="https://serviceapi.spicezgold.com/download/1742453130878_vbvb4.jpg"
              className="w-full absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
            />
            <img
              src="https://serviceapi.spicezgold.com/download/1742453130877_vbvb1.jpg"
              className="w-full"
            />
          </div>
        </Link>
        <span className="discount flex items-center absolute top-[10px] left-[10px] z-50 bg-primary text-white rounded-lg p-1 text-[12px] font-[500]">
          -50%
        </span>
        <div className="actions absolute top-[-200px] right-[5px] z-50 flex items-center gap-2 flex-col w-[50px] transition-all duration-300 group-hover:top-[15px] opacity-0 group-hover:opacity-100">
          <Tooltip title="Add" placement="left-start">
            <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white text-black hover:!bg-primary hover:text-white transition-all duration-300 group">
              <MdZoomOutMap className="text-[18px] !text-black group-hover:text-white hover:!text-white" />
            </Button>
          </Tooltip>
          <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white text-black hover:!bg-primary hover:text-white transition-all duration-300 group">
            <IoGitCompareOutline className="text-[18px] !text-black group-hover:text-white hover:!text-white" />
          </Button>
          <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white text-black hover:!bg-primary hover:text-white transition-all duration-300 group">
            <FaRegHeart className="text-[18px] !text-black group-hover:text-white hover:!text-white" />
          </Button>
        </div>
      </div>
      <div className="p-2">
        <h6 className="text-sm text-gray-500">
          <Link
            to="/"
            className="hover:text-primary transition-all duration-300"
          >
            Camisa de hombre
          </Link>
        </h6>
        <h3 className="text-sm text-black mb-1">
          <Link
            to="/"
            className="hover:text-primary transition-all duration-300 link-hover"
          >
            Camisa Marron tela piqué
          </Link>
        </h3>
        <Rating name="size-small" defaultValue={4} size="small" readOnly />

        <div className="flex items-center gap-4">
          <span className="oldPrice line-through text-gray-500 text-sm font-[500]">
            $100
          </span>
          <span className="price text-primary text-sm font-[500]">$50</span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
