import { Checkbox } from "antd";
import PropTypes from "prop-types";

const CategoryFilter = ({ categories, handleFilter, checkedFilters }) => {
  return (
    <>
      <h4 className="text-center">Filter By Category</h4>

      <div className="d-flex flex-column">
        {categories.map(({ _id, name }) => {
          return (
            <Checkbox
              key={_id}
              onChange={(e) => handleFilter(e.target.checked, _id)}
              checked={checkedFilters.find((id) => id === _id)}
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
  checkedFilters: PropTypes.arrayOf,
  categories: PropTypes.arrayOf(PropTypes.shape),
  handleFilter: PropTypes.func,
};
