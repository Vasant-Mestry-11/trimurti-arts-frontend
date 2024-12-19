import { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import useGetURL from "../../hooks/useGetURL";
import { Link } from "react-router-dom";

const Products = () => {
  const [allProducts, setProducts] = useState([]);
  const url = useGetURL();

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const {
          data: { products },
        } = await axios.get(`${url}/product/all-products`);
        setProducts(products);
      } catch (error) {
        console.log(error);
        toast.error(error);
      }
    };
    getAllProducts();
  }, [url]);

  return (
    <Layout title="Dashboard - All Users">
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Products</h1>
            <div className="d-flex flex-wrap">
              {allProducts?.map((product) => {
                const { _id, name, description, slug } = product;
                return (
                  <Link
                    key={_id}
                    to={`/dashboard/admin/products/${slug}`}
                    className="product-link"
                  >
                    <div className="card m-2" style={{ width: "18rem" }}>
                      <img
                        src={`${url}/product/get-product-photo/${_id}`}
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <p className="card-text">{description}</p>
                        photo
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
