import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import useGetURL from "../hooks/useGetURL";
import CategoryFilter from "../components/Filters/CategoryFilter";
import PriceFilter from "../components/Filters/PriceFilter";

const Homepage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checkedFilters, setCheckedFilters] = useState([]);
  const [checkedPrice, setCheckedPrice] = useState([]);

  const handleFilter = (value, id) => {
    let all = [...checkedFilters];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setCheckedFilters(all);
  };

  const handlePriceChange = (e) => {
    setCheckedPrice(e.target.value);
  };

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

    const getAllCategories = async () => {
      try {
        const { data } = await axios.get(`${url}/category/get-all-categories`);
        const { categories, success } = data;
        if (success) {
          setCategories(categories);
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch categories");
      }
    };

    if (!(checkedPrice.length > 0) && !(checkedFilters.length > 0)) {
      getAllProducts();
    }

    getAllCategories();
  }, [url, checkedFilters, checkedPrice]);

  useEffect(() => {
    const getFilteredProducts = async () => {
      try {
        const { data } = await axios.post(`${url}/product/filter-products`, {
          checkedCategory: checkedFilters,
          checkedPrice,
        });
        const { success, products } = data;
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

    if (checkedFilters.length > 0 || checkedPrice.length > 0)
      getFilteredProducts();
  }, [url, checkedFilters, checkedPrice]);

  return (
    <Layout title="All products - Best offers">
      <div className="m-3 p-3">
        <div className="row">
          <div className="col-md-2">
            <CategoryFilter
              categories={categories}
              handleFilter={handleFilter}
            />
            <PriceFilter handlePriceChange={handlePriceChange} />
          </div>
          <div className="col-md-10">
            <h1 className="text-center">All products</h1>
            <div className="d-flex flex-wrap">
              {allProducts.map((product) => {
                const { _id, name, description, price } = product;
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
                      <p className="card-text">₹ {price}</p>
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
