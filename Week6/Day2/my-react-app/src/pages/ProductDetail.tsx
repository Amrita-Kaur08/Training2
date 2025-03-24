import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get dynamic ID from URL
  const navigate = useNavigate();

  return (
    <div>
      <h1>Product Detail Page</h1>
      <p>Product ID: {id}</p>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
};

export default ProductDetail;
