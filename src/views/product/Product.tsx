import { useEffect, useState } from "react";
import ProductCard from "../../components/productCard/Index";
import "./style.css";
import { Outlet } from "react-router-dom";
import { IProduct } from "../../interface";
import Bar from "../../components/bar";
import Header from "../../components/header/Index";

const Product: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>();
  const [sortProducts, setSortProducts] = useState<IProduct[]>();

  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem("arrProducts") || "[]"));
  }, []);

  return (
    <div>
      <Header />
      <div className="main">
        <div className="container-products">
          <Bar data={products} onData={setSortProducts} />
          {sortProducts?.map((element, index) => {
            return (
              <div className="container">
                <div className="container-card">
                  <ProductCard
                    id={element.id}
                    name={element.name}
                    description={element.description}
                    img={element.img}
                    key={index}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="container-form">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Product;
