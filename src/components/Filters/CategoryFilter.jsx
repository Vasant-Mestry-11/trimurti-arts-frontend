import { Checkbox } from "antd";
import PropTypes from "prop-types";

const CategoryFilter = ({ categories, handleFilter }) => {
  return (
    <>
      <h4 className="text-center">Filter By Category</h4>

      <div className="d-flex flex-column">
        {categories.map(({ _id, name }) => {
          return (
            <Checkbox
              key={_id}
              onChange={(e) => handleFilter(e.target.checked, _id)}
            >
              {name}
            </Checkbox>
          );
        })}
      </div>
    </>
  );
};

export default CategoryFilter;

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape),
  handleFilter: PropTypes.func,
};
