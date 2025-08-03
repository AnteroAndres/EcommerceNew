import React, { useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import "../Siderbar/style.css";
import { Collapse } from "react-collapse";
import { FaAngleDown } from "react-icons/fa";
import { Button } from "@mui/material";
import { FaAngleUp } from "react-icons/fa";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import Rating from "@mui/material/Rating";
const SideBar = () => {
  const [isOpenCategoryFilter, setIsOpenCategoryFilter] = useState(false);
  const [isOpenAvailabilityFilter, setIsOpenAvailabilityFilter] =
    useState(false);
  const [isOpenSizeFilter, setIsOpenSizeFilter] = useState(false);
  return (
    <aside className="sidebar py-5">
      <div className="box">
        <h3 className="mb-3 text-[16px] font-[600] flex items-center">
          Shop by category
          <Button
            className="!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto !text-[#000]"
            onClick={() => setIsOpenCategoryFilter(!isOpenCategoryFilter)}
          >
            {isOpenCategoryFilter ? <FaAngleUp /> : <FaAngleDown />}
          </Button>
        </h3>
        <Collapse isOpened={isOpenCategoryFilter}>
          <div className="scroll px-3 relative left-[10px]">
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Fashion"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Electronics"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Bags"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Footwear"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Groceries"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Toys"
              className="w-full"
            />
          </div>
        </Collapse>
      </div>
      <div className="box">
        <h3 className="mb-3 text-[16px] font-[600] flex items-center">
          Availability
          <Button
            className="!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto !text-[#000]"
            onClick={() =>
              setIsOpenAvailabilityFilter(!isOpenAvailabilityFilter)
            }
          >
            {isOpenAvailabilityFilter ? <FaAngleUp /> : <FaAngleDown />}
          </Button>
        </h3>
        <Collapse isOpened={isOpenAvailabilityFilter}>
          <div className="scroll px-3 relative left-[10px]">
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Available"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="in Stock"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Not Available"
              className="w-full"
            />
          </div>
        </Collapse>
      </div>
      <div className="box">
        <h3 className="mb-3 text-[16px] font-[600] flex items-center">
          Size
          <Button
            className="!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto !text-[#000]"
            onClick={() => setIsOpenSizeFilter(!isOpenSizeFilter)}
          >
            {isOpenSizeFilter ? <FaAngleUp /> : <FaAngleDown />}
          </Button>
        </h3>
        <Collapse isOpened={isOpenSizeFilter}>
          <div className="scroll px-3 relative left-[10px]">
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Small"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Medium"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Large"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="XL"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="XXL"
              className="w-full"
            />
          </div>
        </Collapse>
      </div>
      <div className="box mt-3">
        <h3 className="w-full mb-3 text-[16px] font-[600] flex items-center pr-5">
          Price
        </h3>
        <RangeSlider />
        <div className="flex pt-4 pb-2 priceRange">
          <span className="text-[13px]">
            From: <strong className="text-dark">${100}</strong>
          </span>
          <span className="ml-auto text-[13px]">
            To: <strong className="text-dark">${500000}</strong>
          </span>
        </div>
      </div>
      <div className="box mt-4">
        <h3 className="w-full mb-3 text-[16px] font-[600] flex items-center pr-5">
          Price
        </h3>
        <Rating name="size-small" defaultValue={5} size="small" readOnly />
      </div>
    </aside>
  );
};

export default SideBar;
