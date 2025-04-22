import React, { useState, useEffect, useRef } from "react";
import { RiMenu2Line } from "react-icons/ri";
import { LiaAngleDownSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { GoRocket } from "react-icons/go";
import CategoryPanel from "./categoryPanel";
import { CategoryButton, CustomButton } from "../../ui/CustomMUI";
import "../Navigate/style.css";

const Navigation = () => {
  const [isOpenCatPanel, setIsOpenCatPanel] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const menuRef = useRef(null);

  const openCategoryPanel = () => {
    setIsOpenCatPanel(true);
  };

  const toggleSubmenu = (menuName) => {
    if (activeMenu === menuName) {
      setActiveMenu(null);
    } else {
      setActiveMenu(menuName);
    }
  };
  
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const NavLink = ({ to, children, hasSubmenu = false }) => {
    const isActive = activeMenu === children;
  
    return (
      <li
        className="list-none relative group"
        onMouseEnter={() => hasSubmenu && setActiveMenu(children)}
        onMouseLeave={() => hasSubmenu && setActiveMenu(null)}
      >
        <div
          onClick={() => hasSubmenu && toggleSubmenu(children)}
          className="cursor-pointer"
        >
          <CustomButton className="font-medium text-sm text-[rgba(0,0,0,0.8)] hover:text-[#ff5252] flex items-center">
            {children}
            {hasSubmenu && <LiaAngleDownSolid className="ml-1 text-xs" />}
          </CustomButton>
        </div>
  
        {hasSubmenu && (
          <div
            className={`submenu absolute top-full left-0 min-w-[200px] bg-white shadow-md z-10 rounded transition-all duration-300 ${
              isActive ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
          >
            <ul>
              <li><CategoryButton>Men</CategoryButton></li>
              <li><CategoryButton>Women</CategoryButton></li>
              <li><CategoryButton>Kids</CategoryButton></li>
              <li><CategoryButton>Girls</CategoryButton></li>
              <li><CategoryButton>Boys</CategoryButton></li>
            </ul>
          </div>
        )}
      </li>
    );
  };

  return (
    <>
      <nav className="py-2">
        <div className="container flex items-center justify-end gap-8">
          <div className="col_1 w-[20%]">
            <CustomButton
              className="text-black gap-2 w-full"
              onClick={openCategoryPanel}>
              <RiMenu2Line className="text-lg" />
              Shop By Categories
              <LiaAngleDownSolid className="text-sm ml-auto font-bold cursor-pointer" />
            </CustomButton>
          </div>
          <div className="col_2 w-[60%]" ref={menuRef}>
            <ul className="flex items-center gap-5">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/" hasSubmenu>Fashion</NavLink>
              <NavLink to="/">Bags</NavLink>
              <NavLink to="/">Footwear</NavLink>
              <NavLink to="/">Groceries</NavLink>
              <NavLink to="/">Beauty</NavLink>
              <NavLink to="/">Wellness</NavLink>
              <NavLink to="/">Jewellery</NavLink>
            </ul>
          </div>

          <div className="col_3 w-[20%]">
            <p className="text-sm font-medium flex items-center gap-3 mb-0 mt-0">
              <GoRocket className="text-lg" />
              Free International Delivery
            </p>
          </div>
        </div>
      </nav>
    
      <CategoryPanel
        isOpenCatPanel={isOpenCatPanel}
        setIsOpenCatPanel={setIsOpenCatPanel}
      />
    </>
  );
};

export default Navigation;
