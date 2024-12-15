import { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";

const { Option } = Select;

const CreateProduct = () => {
  const [productData, setProductData] = useState({});
  const [categories, setCategories] = useState([]);

  const {
    name,
    slug,
    description,
    price,
    category,
    quantity,
    photo,
    shipping,
  } = productData;

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-all-categories"
      );
      const { categories, success } = data;
      if (success) {
        setCategories(categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <Layout title="Dashboard - Create Product">
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create product</h1>
            <div className="m-1">
              <Select
                placeholder="Select category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setProductData((prevData) => ({
                    ...prevData,
                    category: value,
                  }));
                }}
              >
                {categories.map((category) => {
                  const { _id, name } = category;
                  return (
                    <Option key={_id} value={_id}>
                      {name}
                    </Option>
                  );
                })}
              </Select>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
