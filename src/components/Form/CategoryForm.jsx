import PropTypes from "prop-types";

const CategoryForm = ({
  onSubmit,
  value,
  onChange,
  name,
  isButtonDisabled,
}) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter new category"
            value={value}
            onChange={onChange}
            name={name}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={isButtonDisabled}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;

CategoryForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  isButtonDisabled: PropTypes.bool,
};
