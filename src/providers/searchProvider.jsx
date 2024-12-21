import { useState } from "react";
import { SearchContext } from "../context/searchContext";
import PropTypes from "prop-types";

export const SearchProvider = ({ children }) => {
  const [searchKeywords, setSearchKeywords] = useState({
    keywords: "",
    results: [],
  });

  return (
    <SearchContext.Provider value={[searchKeywords, setSearchKeywords]}>
      {children}
    </SearchContext.Provider>
  );
};

SearchProvider.propTypes = {
  children: PropTypes.node,
};
