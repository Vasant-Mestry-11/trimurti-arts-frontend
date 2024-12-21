import Layout from "../components/Layout/Layout";
import useSearch from "../hooks/useSearch";
import ProductCard from "../components/ProductCard";

const Search = () => {
  const [values] = useSearch();
  const { results, keywords } = values;
  return (
    <Layout title="Search Results">
      <div className="container">
        <div className="text-center">
          <h1>Search Results for {keywords} </h1>
          <h5>
            {results.length < 1
              ? "No Products Found"
              : `Found ${results.length} Products`}
          </h5>
          <div className="d-flex flex-wrap mt-4">
            {results.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
