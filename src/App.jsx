import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme/theme';
import "./App.css";
import Header from "./components/Header";
import Home from "./Pages/Home";
import ProductList from "./Pages/ProductList";
import AddProduct from "./Pages/AddProduct";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={"/"} exact={true} element={<Home/>}/>
          <Route path={"/productList"} exact={true} element={<ProductList/>}/>
          <Route path={"/add-product"} exact={true} element={<AddProduct/>}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
