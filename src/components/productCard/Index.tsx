import { useNavigate } from "react-router-dom";
import "./style.css";
import img from "../../assets/flowers.jpg";

interface IProps {
  id: number;
  img: string;
  name: string;
  description: string;
  key: number;
}

const ProductCard: React.FC<IProps> = ({ id, name, description, key }) => {
  const navigate = useNavigate();

  const deleteProduct = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const products = JSON.parse(localStorage.getItem("arrProducts") || "[]");
    products.splice(key, 1);
    localStorage.removeItem("arrProducts");
    localStorage.setItem("arrProducts", JSON.stringify(products));
    navigate(0);
  };

  return (
    <div
      className="product-container"
      onClick={() => {
        navigate(`/product/:${id}`);
      }}
    >
      <div className="product-image">
        <img src={`${img}`} width="90%" height="150px" alt={"flowers"} />
      </div>
      <div className="product-info">
        <h3>{name + " " + id}</h3>
        <p>{description}</p>
      </div>
      <div className="product-button">
        <button className="button-del" onClick={deleteProduct}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
