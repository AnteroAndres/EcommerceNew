import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

export const CustomButton = styled(({ className, ...props }) => {
  const hasFontBold = className?.includes("font-bold");

  return (
    <Button
      className={className}
      {...props}
      sx={{
        fontWeight: hasFontBold ? "bold" : "normal",
        ...(props.sx || {}),
      }}
    />
  );
})({
  textTransform: "capitalize",
  textAlign: "left",
  justifyContent: "flex-start",
  padding: "8px 24px",
  color: "rgba(0,0,0,0.8)",
  "&:hover": {
    backgroundColor: "transparent",
  },
});

export const CategoryButton = ({ children, className, ...props }) => {
  return (
    <CustomButton className={`w-full ${className || ""}`} {...props}>
      {children}
    </CustomButton>
  );
};

export const CategoryLink = styled(({ className, ...props }) => (
  <a
    className={`block w-full px-6 py-2 text-[rgba(0,0,0,0.8)] no-underline hover:text-[#ff5252] ${
      className || ""
    }`}
    {...props}
  />
))({});
