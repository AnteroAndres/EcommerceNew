import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { IoCloseSharp } from "react-icons/io5";
import { FaRegSquarePlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { CustomButton, CategoryButton } from "../../ui/CustomMUI";
import { FiMinusSquare } from "react-icons/fi";

const CategoryPanel = (props) => {
  const [submenuIndex, setSubmenuIndex] = useState(null);
  const [innerSubmenuIndex, setInnerSubmenuIndex] = useState(null);

  const toggleDrawer = (newOpen) => () => {
    props.setIsOpenCatPanel(newOpen);
  };

  const openSubMenu = (index) => {
    if (submenuIndex === index) {
      setSubmenuIndex(null);
    } else {
      setSubmenuIndex(index);
    }
  };

  const openInnerSubMenu = (index) => {
    if (innerSubmenuIndex === index) {
      setInnerSubmenuIndex(null);
    } else {
      setInnerSubmenuIndex(index);
    }
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" className="categoryPanel">
      <h3 className="p-3 text-base font-medium flex items-center justify-between">
        Shop By Categories{" "}
        <IoCloseSharp
          onClick={toggleDrawer(false)}
          className="cursor-pointer text-xl"
        />
      </h3>

      <div className="scroll">
        <ul className="w-full">
          <li className="list-none flex items-center relative flex-col">
            <Link to="/" className="w-full">
              <CategoryButton>Fashion</CategoryButton>
            </Link>

            {submenuIndex === 0 ? (
              <FiMinusSquare
                className="absolute top-[10px] right-[15px] cursor-pointer"
                onClick={() => openSubMenu(0)}
              />
            ) : (
              <FaRegSquarePlus
                className="absolute top-[10px] right-[15px] cursor-pointer"
                onClick={() => openSubMenu(0)}
              />
            )}
            {submenuIndex === 0 && (
              <ul className="w-full pl-3 border-l border-gray-200 ml-4 mt-1">
                <li className="list-none relative">
                  <Link to="/" className="w-full">
                    <CategoryButton>Apparel</CategoryButton>
                  </Link>
                  {innerSubmenuIndex === 0 ? (
                    <FiMinusSquare
                      className="absolute top-[10px] right-[15px]"
                      onClick={() => openInnerSubMenu(0)}
                    />
                  ) : (
                    <FaRegSquarePlus
                      className="absolute top-[10px] right-[15px]"
                      onClick={() => openInnerSubMenu(0)}
                    />
                  )}

                  {innerSubmenuIndex === 0 && (
                    <ul className="w-full pl-3 border-l border-gray-200 ml-4 mt-1">
                      <li className="list-none relative mb-1">
                        <Link
                          to="/"
                          className="block w-full px-3 transition text-sm hover:text-[#ff5252]"
                        >
                          Smart Tablet
                        </Link>
                      </li>
                      <li className="list-none relative mb-1">
                        <Link
                          to="/"
                          className="block w-full px-3 transition text-sm hover:text-[#ff5252]"
                        >
                          Crepe T-Shirt
                        </Link>
                      </li>
                      <li className="list-none relative mb-1">
                        <Link
                          to="/"
                          className="block w-full px-3 transition text-sm hover:text-[#ff5252]"
                        >
                          Leather Watch
                        </Link>
                      </li>
                      <li className="list-none relative mb-1">
                        <Link
                          to="/"
                          className="block w-full px-3 transition text-sm hover:text-[#ff5252]"
                        >
                          Rolling Diamond
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            )}
          </li>
          <li className="list-none flex items-center relative flex-col">
            <Link to="/" className="w-full">
              <CategoryButton>Outerwear</CategoryButton>
            </Link>

            {submenuIndex === 1 ? (
              <FiMinusSquare
                className="absolute top-[10px] right-[15px] cursor-pointer"
                onClick={() => openSubMenu(1)}
              />
            ) : (
              <FaRegSquarePlus
                className="absolute top-[10px] right-[15px] cursor-pointer"
                onClick={() => openSubMenu(1)}
              />
            )}
            {submenuIndex === 1 && (
              <ul className="w-full pl-3 border-l border-gray-200 ml-4 mt-1">
                <li className="list-none relative">
                  <Link to="/" className="w-full">
                    <CategoryButton>Apparel</CategoryButton>
                  </Link>
                  {innerSubmenuIndex === 1 ? (
                    <FiMinusSquare
                      className="absolute top-[10px] right-[15px]"
                      onClick={() => openInnerSubMenu(1)}
                    />
                  ) : (
                    <FaRegSquarePlus
                      className="absolute top-[10px] right-[15px]"
                      onClick={() => openInnerSubMenu(1)}
                    />
                  )}

                  {innerSubmenuIndex === 1 && (
                    <ul className="w-full pl-3 border-l border-gray-200 ml-4 mt-1">
                      <li className="list-none relative mb-1">
                        <Link
                          to="/"
                          className="block w-full px-3 transition text-sm hover:text-[#ff5252]"
                        >
                          Smart Tablet
                        </Link>
                      </li>
                      <li className="list-none relative mb-1">
                        <Link
                          to="/"
                          className="block w-full px-3 transition text-sm hover:text-[#ff5252]"
                        >
                          Crepe T-Shirt
                        </Link>
                      </li>
                      <li className="list-none relative mb-1">
                        <Link
                          to="/"
                          className="block w-full px-3 transition text-sm hover:text-[#ff5252]"
                        >
                          Leather Watch
                        </Link>
                      </li>
                      <li className="list-none relative mb-1">
                        <Link
                          to="/"
                          className="block w-full px-3 transition text-sm hover:text-[#ff5252]"
                        >
                          Rolling Diamond
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </Box>
  );
  return (
    <>
      {/* <Button onClick={toggleDrawer(true)}>Open Drawer</Button> */}
      <Drawer open={props.isOpenCatPanel} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </>
  );
};

export default CategoryPanel;
