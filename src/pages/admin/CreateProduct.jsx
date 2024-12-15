import { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import useGetURL from "../../hooks/useGetURL";

const { Option } = Select;

const CreateProduct = () => {
  const [productData, setProductData] = useState({});
  const [categories, setCategories] = useState([]);

  const url = useGetURL();

  const { name, description, price, category, quantity, photo, shipping } =
    productData;

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

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("shipping", shipping);
      formData.append("photo", photo);
      formData.append("category", category);
      const { data } = await axios.post(
        `${url}/product/create-product`,
        formData
      );
      const { success } = data;
      if (success) {
        setProductData({});
        toast.success("Product created successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create product");
    }
  };

  const handleProductDetailChanges = (e) => {
    setProductData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
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
            <div className="m-1 w-75">
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
                value={category}
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

              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="photo"
                      className="img img-responsive"
                      height="200px"
                    />
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label
                  htmlFor="upload"
                  className="btn btn-outline-secondary col-md-12"
                >
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="upload"
                    id="upload"
                    accept="image/*"
                    onChange={(e) => {
                      setProductData((prevData) => ({
                        ...prevData,
                        photo: e.target.files[0],
                      }));
                    }}
                    hidden
                  />
                </label>
              </div>

              {/* name */}
              <div className="mb-3">
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleProductDetailChanges}
                  className="form-control"
                  placeholder="Enter product name"
                />
              </div>

              {/* description */}
              <div className="mb-3">
                <textarea
                  name="description"
                  value={description}
                  onChange={handleProductDetailChanges}
                  className="form-control"
                  placeholder="Enter product description"
                />
              </div>

              {/* price */}
              <div className="mb-3">
                <input
                  type="number"
                  name="price"
                  value={price}
                  onChange={handleProductDetailChanges}
                  className="form-control"
                  placeholder="Enter product price"
                />
              </div>

              {/* quantity */}
              <div className="mb-3">
                <input
                  type="number"
                  name="quantity"
                  value={quantity}
                  onChange={handleProductDetailChanges}
                  className="form-control"
                  placeholder="Enter product quantity"
                />
              </div>

              {/* Shipping */}
              <div className="mb-3">
                <Select
                  placeholder="Select shipping"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setProductData((prevData) => ({
                      ...prevData,
                      shipping: value,
                    }));
                  }}
                  name="shipping"
                  options={[
                    { value: "y", label: "Yes" },
                    { value: "n", label: "No" },
                  ]}
                  value={shipping}
                />
              </div>

              <div className="mb-3">
                <button
                  className="btn btn-primary"
                  onClick={handleCreateProduct}
                >
                  Create Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
