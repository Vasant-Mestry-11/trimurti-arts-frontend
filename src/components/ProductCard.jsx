import PropTypes from "prop-types";
import useGetURL from "../hooks/useGetURL";
import { useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const { _id, name, description, price, slug } = product;
  const url = useGetURL();
  const navigate = useNavigate();

  const [cart, setCart] = useCart();

  const handleAddToCart = () => {
    setCart((prevState) => [...prevState, product]);
    localStorage.setItem("cart", JSON.stringify([...cart, product]));
    toast.success("Product added to cart");
  };

  const handleMoreDetails = () => {
    navigate(`/product/${slug}`);
  };
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
        <button className="btn btn-primary ms-1" onClick={handleMoreDetails}>
          More details
        </button>
        <button className="btn btn-secondary ms-1" onClick={handleAddToCart}>
          Add to cart
        </button>
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
    slug: PropTypes.string,
  }),
};
