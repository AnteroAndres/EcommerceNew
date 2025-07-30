import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./Pages/Home";
import ProductList from "./Pages/ProductList";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={"/"} exact={true} element={<Home/>}/>
          <Route path={"/productsList"} exact={true} element={<ProductList/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
