import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { IProduct } from "../../interface";

interface IProps {
  data: IProduct[] | undefined;
  onData: (sortedData: IProduct[] | undefined) => void;
}

const Bar: React.FC<IProps> = ({ data, onData }) => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<"name" | "date">("name");

  useEffect(() => {
    sortProducts(sortBy);
  }, [sortBy, data]);
console.log(data);

  const sortProducts = (sortOption: "name" | "date") => {
    if (data) {
      const sortedData = [...data].sort((a, b) => {
        if (sortOption === "name") {
          return a.name.localeCompare(b.name);
        } else if (sortOption === "date") {
          const aDate = typeof a.date === "string" ? new Date(a.date) : a.date;
          const bDate = typeof b.date === "string" ? new Date(b.date) : b.date;

          if (aDate.getTime() === bDate.getTime()) {
            return a.name.localeCompare(b.name);
          }
          return aDate.getTime() - bDate.getTime();
        }
        return 0;
      });
      onData(sortedData);
    }
  };

  return (
    <div className="container">
      <div>
        <button
          className="button-add"
          onClick={() => navigate("/product/add-product")}
        >
          +Add
        </button>
      </div>
      <div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "name" | "date")}
        >
          <option value="name">Sort by Name</option>
          <option value="date">Sort by Date</option>
        </select>
      </div>
    </div>
  );
};

export default Bar;
