import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff5252',
      light: '#ff7961',
      dark: '#c50e29',
      contrastText: '#fff',
    },
    secondary: {
      main: '#f50057',
      light: '#ff5983',
      dark: '#bb002f',
      contrastText: '#fff',
    },
  },
  components: {
    // Personalizar todos los botones por defecto
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 600,
          transition: 'all 0.3s ease',
        },
        contained: {
          boxShadow: '0 4px 12px rgba(255, 82, 82, 0.3)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 20px rgba(255, 82, 82, 0.4)',
          },
          '&:active': {
            transform: 'translateY(0)',
            boxShadow: '0 2px 8px rgba(255, 82, 82, 0.3)',
          },
        },
      },
    },
    // Personalizar badges
    MuiBadge: {
      styleOverrides: {
        badge: {
          backgroundColor: '#ff5252',
        },
      },
    },
    // Personalizar tabs
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: '#ff5252',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: '#ff5252',
          },
        },
      },
    },
    // Personalizar checkboxes
    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: '6px',
          '&.Mui-checked': {
            color: '#ff5252',
          },
        },
      },
    },
    // Personalizar pagination
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#ff5252',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#e04848',
            },
          },
        },
      },
    },
  },
  typography: {
    fontFamily: '"Montserrat", sans-serif',
  },
});

export default theme;