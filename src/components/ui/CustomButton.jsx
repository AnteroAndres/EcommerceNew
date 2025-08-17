import React from 'react';
import { Button, styled } from '@mui/material';

// Opción 1: Usando styled-components (recomendado)
export const PrimaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#ff5252',
  color: '#fff',
  borderRadius: '8px',
  padding: '12px 32px',
  fontSize: '16px',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '1px',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 12px rgba(255, 82, 82, 0.3)',
  minWidth: '140px',
  border: 'none',
  '&:hover': {
    backgroundColor: '#e04848',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(255, 82, 82, 0.4)',
  },
  '&:active': {
    transform: 'translateY(0)',
    boxShadow: '0 2px 8px rgba(255, 82, 82, 0.3)',
  },
  '&:focus': {
    outline: 'none',
    boxShadow: '0 0 0 3px rgba(255, 82, 82, 0.2)',
  }
}));

// Opción 2: Botón circular para acciones (como los del ProductItem)
export const CircularActionButton = styled(Button)(({ theme }) => ({
  width: '35px',
  height: '35px',
  minWidth: '35px',
  borderRadius: '50%',
  backgroundColor: '#fff',
  color: '#000',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#ff5252',
    color: '#fff',
    '& svg': {
      color: '#fff',
    }
  },
  '& svg': {
    fontSize: '18px',
    color: '#000',
    pointerEvents: 'none',
  }
}));

// Opción 3: Botón usando sx prop (para casos específicos)
export const CustomButtonWithSx = ({ children, variant = "contained", ...props }) => {
  return (
    <Button
      variant={variant}
      sx={{
        backgroundColor: '#ff5252',
        color: '#fff',
        borderRadius: '8px',
        padding: '12px 32px',
        fontSize: '16px',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '1px',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 12px rgba(255, 82, 82, 0.3)',
        minWidth: '140px',
        border: 'none',
        '&:hover': {
          backgroundColor: '#e04848',
          transform: 'translateY(-2px)',
          boxShadow: '0 6px 20px rgba(255, 82, 82, 0.4)',
        },
        '&:active': {
          transform: 'translateY(0)',
          boxShadow: '0 2px 8px rgba(255, 82, 82, 0.3)',
        },
        '&:focus': {
          outline: 'none',
          boxShadow: '0 0 0 3px rgba(255, 82, 82, 0.2)',
        }
      }}
      {...props}
    >
      {children}
    </Button>
  );
};