import toast from "react-hot-toast";
import useSearch from "../../hooks/useSearch";
import axios from "axios";
import useGetURL from "../../hooks/useGetURL";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [searchKeywords, setSearchKeywords] = useSearch();
  const url = useGetURL();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchKeywords((prevState) => ({
      ...prevState,
      keywords: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${url}/product/search-products/${searchKeywords.keywords}`
      );
      const { products, success } = data;
      if (success) {
        setSearchKeywords((prevState) => ({
          ...prevState,
          results: products,
        }));
        navigate('/search')
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
  return (
    <div>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={searchKeywords.keywords}
          onChange={handleChange}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
