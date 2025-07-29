import React, { useState } from "react";
import { Link } from "react-router-dom";
import Search from "../Search";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoGitCompareOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import { RiMenu3Line } from "react-icons/ri";
import Tooltip from "@mui/material/Tooltip";
import Navigation from "./Navigation";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white w-full">
      {/* Top strip - hide on mobile */}
      <div className="top-strip py-2 border-t-[1px] border-gray-250 border-b-[1px] w-full hidden md:block">
        <div className="container mx-auto px-4 w-full">
          <div className="flex items-center justify-between">
            <div className="col1">
              <p className="text-[12px] font-[500]">
                Get up to 50% off new season styles, limited time only
              </p>
            </div>

            <div className="col2 flex items-center justify-end">
              <ul className="flex items-center gap-3">
                <li className="list-none">
                  <Link
                    to="/help-center"
                    className="text-[13px] link font-[500] transition"
                  >
                    Help Center
                  </Link>
                </li>
                <li className="list-none">
                  <Link
                    to="/order-tracking"
                    className="text-[13px] link font-[500] transition"
                  >
                    Order Tracking
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="header py-4 border-b-[1px] border-gray-250 w-full">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Logo */}
            <div className="w-full md:w-[25%] flex items-center justify-between">
              <Link to={"/"}>
                <img src="/public/logo.jpg" className="w-24 h-auto" alt="Logo" />
              </Link>
              {/* Mobile menu button */}
              <button 
                className="md:hidden text-2xl"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <RiMenu3Line />
              </button>
            </div>

            {/* Search - Full width on mobile */}
            <div className="w-full md:w-[45%]">
              <Search />
            </div>

            {/* Actions - Hidden in mobile menu */}
            <div className={`w-full md:w-[30%] md:flex items-center md:pl-7 ${mobileMenuOpen ? 'block' : 'hidden md:flex'}`}>
              <ul className="flex flex-col md:flex-row items-center justify-end gap-3 w-full">
                <li className="list-none w-full md:w-auto text-center">
                  <Link
                    to="/login"
                    className="link transition text-[15px] font-[500]"
                  >
                    Login
                  </Link>{" "}
                  | &nbsp;
                  <Link
                    to="/register"
                    className="link transition text-[15px] font-[500]"
                  >
                    register
                  </Link>
                </li>
                <li>
                  <Tooltip title="Compare">
                    <IconButton aria-label="cart">
                      <StyledBadge badgeContent={4} color="secondary">
                        <IoGitCompareOutline />
                      </StyledBadge>
                    </IconButton>
                  </Tooltip>
                </li>
                <li>
                  <Tooltip title="Wishlist">
                    <IconButton aria-label="cart">
                      <StyledBadge badgeContent={4} color="secondary">
                        <FaRegHeart />
                      </StyledBadge>
                    </IconButton>
                  </Tooltip>
                </li>
                <li>
                  <Tooltip title="Cart">
                    <IconButton aria-label="cart">
                      <StyledBadge badgeContent={4} color="secondary">
                        <MdOutlineShoppingCart />
                      </StyledBadge>
                    </IconButton>
                  </Tooltip>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Navigation />
    </header>
  );
};

export default Header;
