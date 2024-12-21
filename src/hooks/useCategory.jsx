import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useGetURL from "./useGetURL";

export const useCategory = () => {
  const [categories, setCategories] = useState([]);
  const url = useGetURL();

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(`${url}/category/get-all-categories`);
      const { success, categories } = data;
      if (success) {
        setCategories(categories);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return categories;
};
