import React, { useState, useEffect, useRef } from "react";
import { RiMenu2Line } from "react-icons/ri";
import { LiaAngleDownSolid } from "react-icons/lia";
import { GoRocket } from "react-icons/go";
import CategoryPanel from "./categoryPanel";
import { Link } from "react-router-dom";
import { CategoryButton, CustomButton } from "../../ui/CustomMUI";
import "../Navigate/style.css";

const Navigation = () => {
  const [isOpenCatPanel, setIsOpenCatPanel] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubSubmenu, setActiveSubSubmenu] = useState(null);
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
          <CustomButton className="font-bold text-sm text-[rgba(0,0,0,0.8)] hover:text-[#ff5252] flex items-center">
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
              <li className="relative group"
               onMouseEnter={() => setActiveSubSubmenu("men")}
               onMouseLeave={() => setActiveSubSubmenu(null)}
               onClick={() => setActiveSubSubmenu(prev => prev === "men" ? null : "men")}
              > <div className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Men
            </div>
            {/* Sub-submenu men*/}
            {activeSubSubmenu === "men" && (
              <div className="absolute top-0 left-full bg-white shadow-lg rounded w-40">
                <ul>
                  <li>
                    <Link to="/fashion/men/t-shirt" className="block px-4 py-2 hover:bg-gray-100">T-Shirt</Link>
                  </li>
                  <li>
                    <Link to="/fashion/men/jeans" className="block px-4 py-2 hover:bg-gray-100">Jeans</Link>
                  </li>
                  <li>
                    <Link to="/fashion/men/fotwear" className="block px-4 py-2 hover:bg-gray-100">Footwear</Link>
                  </li>
                  <li>
                    <Link to="/fashion/men/watch" className="block px-4 py-2 hover:bg-gray-100">Watch</Link>
                  </li>
                  <li>
                    <Link to="/fashion/men/pents" className="block px-4 py-2 hover:bg-gray-100">Pents</Link>
                  </li>
                </ul>
              </div>
            )}
          </li>
              <li className="list-none w-full"> 
                <Link  to="/fashion/women" className="block py-2 hover:bg-gray-100 rounded">
                <CategoryButton>Women</CategoryButton></Link ></li>
              <li className="list-none w-full"> 
                <Link  to="/fashion/kids" className="block py-2 hover:bg-gray-100 rounded">
                <CategoryButton>Kids</CategoryButton></Link ></li>
              <li className="list-none w-full"> 
                <Link  to="/fashion/girls" className="block py-2 hover:bg-gray-100 rounded">
                <CategoryButton>Girls</CategoryButton></Link ></li>
              <li className="list-none w-full"> 
                <Link  to="/fashion/boys" className="block py-2 hover:bg-gray-100 rounded">
                <CategoryButton>Boys</CategoryButton></Link ></li>
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
              className="text-black font-bold gap-2 w-full"
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
              <NavLink to="/">New Arrivals</NavLink>
              <NavLink to="/">More</NavLink>
            </ul>
          </div>

          <div className="col_3 w-[20%]">
            <p className="text-sm font-bold flex items-center gap-3 mb-0 mt-0">
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
