import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import axios from "axios";
import useGetURL from "../hooks/useGetURL";

const Homepage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const url = useGetURL();

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const { data } = await axios.get(`${url}/product/all-products/`);
        const { products, success } = data;

        if (success) {
          setAllProducts(products);
        } else {
          toast.error("Failed to fetch products");
        }
      } catch (error) {
        console.log(error);
        toast.error(error);
      }
    };

    getAllProducts();
  }, [url]);

  return (
    <Layout title="All products - Best offers">
      <div className="m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <h4 className="text-center">Filter By Category</h4>
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All products</h1>
            <div className="d-flex flex-wrap">
              {allProducts?.map((product) => {
                const { _id, name, description } = product;
                return (
                  <div
                    key={_id}
                    className="card m-2"
                    style={{ width: "18rem" }}
                  >
                    <img
                      src={`${url}/product/get-product-photo/${_id}`}
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title">{name}</h5>
                      <p className="card-text">{description}</p>
                      <button className="btn btn-primary ms-1">
                        More details
                      </button>
                      <button className="btn btn-secondary ms-1">
                        Add to cart
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
