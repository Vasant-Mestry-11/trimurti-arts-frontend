import toast from "react-hot-toast";
import Layout from "../../components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import useGetURL from "../../hooks/useGetURL";
import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";

const ProductDetails = () => {
  const { slug } = useParams();
  const url = useGetURL();
  const [productDetails, setProductDetails] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);

  const { _id, name, description, price, quantity, category } = productDetails;

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const { data } = await axios.get(`${url}/product/get-product/${slug}`);
        const { success, product } = data;
        if (success) {
          setProductDetails(product);
          getSimilarProducts();
        } else {
          toast.error("Something went wrong");
        }
      } catch (error) {
        console.log(error);
        toast.error(error);
      }
    };

    const getSimilarProducts = async () => {
      if (_id && category._id) {
        try {
          const { data } = await axios.get(
            `${url}/product/related-products/${_id}/${category?._id}`
          );
          const { success, products } = data;
          if (success) {
            console.log(products);
            setSimilarProducts(products);
          } else {
            toast.error("Something went wrong");
          }
        } catch (error) {
          console.log(error);
          toast.error(error);
        }
      }
    };

    getProductDetails();
  }, [slug, url, _id, category?._id]);
  return (
    <Layout>
      <div className="row container m-3">
        <div className="col-md-6">
          <img
            src={`${url}/product/get-product-photo/${_id}`} // fix this BSON error
            className="card-img-top"
            alt={name}
          />
        </div>
        <div className="col-md-6">
          <h1 className="text-center">Product Details</h1>

          <h5 className="mt-4">Name: {name}</h5>
          <h5>Description: {description}</h5>
          <h5>Price: ₹ {price}</h5>
          <h5>Quantity: {quantity}</h5>
          <h5>Category: {category?.name}</h5>
          <button className="btn btn-secondary mt-4">Add to cart</button>
        </div>
      </div>

      <hr />
      <h3 className="text-center">Similar Products</h3>
      {similarProducts.length < 1 ? (
        <p className="text-center">No similar products found</p>
      ) : (
        <div className="m-3 d-flex flex-wrap">
          {similarProducts.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      )}
    </Layout>
  );
};

export default ProductDetails;
