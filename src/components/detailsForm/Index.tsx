import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./style.css";
import { IProduct } from "../../interface";
import img from "../../assets/flowers.jpg";

interface IProps {
  type: string;
}

const Details: React.FC<IProps> = ({ type }) => {
  const [products, setProducts] = useState<IProduct[]>();
  const [product, setProduct] = useState({
    id: undefined,
    img,
    name: "",
    description: "",
    date:"",
    price: 1,
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const productId = Number(id?.split(":")[1]);

  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem("arrProducts") || "[]"));

    const products = JSON.parse(localStorage.getItem("arrProducts") || "[]");
    products && type === "updateProduct"
      ? setProduct(
          products.find((product: IProduct) => product.id === productId)
        )
      : setProduct({ id: undefined, img, name: "", description: "", price: 1 ,date:""});
  }, [productId, type]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
console.log(product.date);

    if (type === "updateProduct") {
      const formProduct = {
        id: productId,
        name: data.get("name"),
        date:product.date,
        description: data.get("description"),
        price: data.get("price"),

      };
      const newProducts = products?.map((product) => {
        if (product.id === productId) {
          return formProduct;
        }
        return product;
      });
      localStorage.removeItem("arrProducts");
      localStorage.setItem("arrProducts", JSON.stringify(newProducts));
    } else if (type === "addProduct") {
      const newProduct = {
        id: Math.floor(Math.random() * 90) + 10,
        img: `${img}`,
        name: data.get("name"),
        description: data.get("description"),
        price: data.get("price"),
        date: new Date(),
      };
      localStorage.removeItem("arrProducts");
      products &&
        localStorage.setItem(
          "arrProducts",
          JSON.stringify([...products, newProduct])
        );
      products && console.log([...products, newProduct]);
    }
    navigate(0);
  };

  return (
    <div>
      <label>
        {type === "updateProduct"
          ? `Product ${Number(id?.split(":")[1])} Details`
          : "Add Product"}
      </label>
      <form onSubmit={handleSubmit}>
        <div>
          <img src={img} alt="flowers" width={"100px"} height={"100px"} />
        </div>
        <label>Name</label>
        <div className="container-input">
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            maxLength={30}
            required
          />
        </div>
        <label>Description</label>
        <div className="container-input">
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            maxLength={200}
            rows={5}
            required
          />
        </div>
        <label>Price</label>
        <div>
          <input
            className="input-price"
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            min={1}
            required
          />
          <span>$</span>
        </div>
        <div className="container-button">
          <button className="button-save" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Details;
