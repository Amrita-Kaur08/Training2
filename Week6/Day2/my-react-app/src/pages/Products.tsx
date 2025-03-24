import React from "react";
import { Link } from "react-router-dom";

const Products: React.FC = () => {
  return (
    <div>
      <h1>Products Page</h1>
      <ul>
        <li><Link to="/products/1">Product 1</Link></li>
        <li><Link to="/products/2">Product 2</Link></li>
      </ul>
    </div>
  );
};

export default Products;

