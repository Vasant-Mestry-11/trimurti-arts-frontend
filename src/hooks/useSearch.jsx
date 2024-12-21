import { useContext } from "react";
import { SearchContext } from "../context/searchContext";

const useSearch = () => useContext(SearchContext);

export default useSearch;
