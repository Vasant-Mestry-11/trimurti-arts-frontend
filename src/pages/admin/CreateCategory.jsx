import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";
import useGetURL from "../../hooks/useGetURL";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const { categoryName } = formData;

  const url = useGetURL();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${url}/category/create-category`, {
        name: categoryName,
      });
      const { success } = data;
      if (success) {
        toast.success("Category created successfully");
        getAllCategories();
        setFormData((prevState) => ({
          ...prevState,
          categoryName: "",
        }));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit category");
    }
  };

  const handleCategoryUpdate = async (e) => {
    const { _id } = selected;
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${url}/category/update-category/${_id}`,
        {
          name: updatedName,
        }
      );
      const { success } = data;
      if (success) {
        toast.success("Category updated successfully");
        setUpdatedName(null);
        setSelected(null);
        setIsModalOpen(false);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update category");
    }
  };

  const handleDeleteCategory = async (e) => {
    const { _id } = selected;
    e.preventDefault();
    try {
      const { data } = await axios.delete(
        `${url}/category/delete-category/${_id}`
      );
      const { success } = data;
      if (success) {
        toast.success("Category deleted successfully");
        setUpdatedName(null);
        setSelected(null);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete category");
    }
  };

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <Layout title="Dashboard - Create Category">
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage category</h1>

            <div className="p-3 w-50">
              <CategoryForm
                value={categoryName}
                onChange={handleChange}
                onSubmit={handleSubmit}
                name="categoryName"
                isButtonDisabled={!categoryName}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((category) => {
                    const { _id, name } = category;
                    return (
                      <tr key={_id}>
                        <td>{name}</td>
                        <td>
                          <button
                            className="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            onClick={() => {
                              setIsModalOpen(true);
                              setUpdatedName(name);
                              setSelected(category);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger ms-2"
                            onClick={(e) => {
                              setSelected(category);
                              handleDeleteCategory(e);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <Modal
            onCancel={() => setIsModalOpen(false)}
            open={isModalOpen}
            footer={null}
            title="Update Category"
          >
            <CategoryForm
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
              onSubmit={handleCategoryUpdate}
            />
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
