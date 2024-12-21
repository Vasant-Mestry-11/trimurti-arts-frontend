import { Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { useCategory } from "../../hooks/useCategory";

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title="All Categories">
      <div className="container m-3">
        <div className="row">
          {categories.map(({ _id, name, slug }) => {
            return (
              <div key={_id} className="col-md-6 g-4">
                <Link to={`/categories/${slug}`} className="btn btn-info">
                  {name}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
