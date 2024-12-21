import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import toast from "react-hot-toast";
import useGetURL from "../hooks/useGetURL";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const CategoryProduct = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const url = useGetURL();
  const { slug } = useParams();

  useEffect(() => {
    const getProductsByCategory = async () => {
      try {
        const { data } = await axios.get(
          `${url}/product/product-category/${slug}`
        );
        const { success, products, category } = data;

        if (success) {
          setProducts(products);
          setCategory(category);
        } else {
          toast.error("Something went wrong");
        }
      } catch (error) {
        console.log(error);
        toast.error(error);
      }
    };

    if (slug) {
      getProductsByCategory();
    }
  }, [slug, url]);

  return (
    <Layout>
      <div className="container m-3">
        <h4 className="text-center">Category: {category.name}</h4>
        <h6 className="text-center">{products.length} results found</h6>
        <div className="d-flex flex-wrap">
          {products.map((product) => (
            <ProductCard product={product} key={product.key} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
