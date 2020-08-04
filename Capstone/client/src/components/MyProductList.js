import React, { useContext, useEffect } from "react";
import { ProductContext } from "../providers/ProductProvider";
import Product from "./Product";

const MyProductList = () => {

  const { products, getProductsByUser } = useContext(ProductContext);

  useEffect(() => {
    getProductsByUser();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyProductList;