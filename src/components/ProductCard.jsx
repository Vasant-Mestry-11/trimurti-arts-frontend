import PropTypes from "prop-types";
import useGetURL from "../hooks/useGetURL";

const ProductCard = ({ product }) => {
  const { _id, name, description, price } = product;
  const url = useGetURL()
  return (
    <div key={_id} className="card m-2" style={{ width: "18rem" }}>
      <img
        src={`${url}/product/get-product-photo/${_id}`}
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text">₹ {price}</p>
        <button className="btn btn-primary ms-1">More details</button>
        <button className="btn btn-secondary ms-1">Add to cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.string,
  }),
};
