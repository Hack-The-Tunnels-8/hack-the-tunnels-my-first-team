import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Page } from "../../components";
import { ServiceAPI } from "../../infrastructure";
import "./Product.style.scss";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const json = await ServiceAPI.fetchProduct(id);
      if (json.error !== null) {
        setMessage(json.error);
        return;
      }

      setProduct(json.data.product);
    };

    fetchData();
  }, []);

  return (
    <Page>
      <div className="product-page">
        {message && <p>{message}</p>}
        {product && (
          <>
          <h3 className="product_title">Title: {product.title}</h3>
            <div className="product-page__product">
            
              <div className="column1">
                
                <img src={product.imageUrl} alt={product.title} className="productImage" />
              </div>
              <div className="column2">
                <p>ID: {id}</p>
                <p>Description: {product.description}</p>
                <p>Price: {product.price}</p>
                <Link to={`/checkout/${product.id}`}>
                <button className="buy_button">Buy Now</button>
                </Link>
              </div>
            </div>
            
          </>
        )}
      </div>
    </Page>
  );
}

export default Product;
