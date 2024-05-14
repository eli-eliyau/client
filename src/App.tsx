import { Navigate, Route, Routes } from "react-router-dom";
import Product from "./views/product/Product";
import Details from "./components/detailsForm/Index";

function App() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Navigate to="/product" />} />
          <Route path="/product" element={<Product />}>
            <Route path="/product/:id" element={<Details type='updateProduct'/>} />
            <Route path="/product/add-product" element={<Details type='addProduct'/>} />
          </Route>
        </Routes>
    </div>
  );
}

export default App;
