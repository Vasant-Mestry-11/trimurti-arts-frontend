import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";
import useGetURL from "../hooks/useGetURL";

const Cart = () => {
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const navigate = useNavigate();
  const url = useGetURL();

  const handleItemRemove = (id) => {
    let temporaryCart = [...cart];
    let index = temporaryCart.findIndex((item) => item._id === id);
    temporaryCart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(temporaryCart));
    setCart(temporaryCart);
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center p-2 mb-2">
              {`Hello ${auth?.token && auth.user.name}`}
            </h1>
            <h4 className="text-center">
              {cart.length > 0
                ? `You have ${cart.length} items in your cart ${
                    auth.token ? "" : "Please login to checkout"
                  }`
                : `Your cart is empty`}
            </h4>
          </div>
        </div>

        <div className="row">
          <div className="col-md-7">
            {cart.map(({ _id, name, description, price }) => {
              return (
                <div className="row mb-2 card flex-row" key={_id}>
                  <div className="col-md-4">
                    <img
                      src={`${url}/product/get-product-photo/${_id}`}
                      className="card-img-top"
                      alt={name}
                      height="200px"
                      width="200px"
                    />
                  </div>
                  <div className="col-md-4">
                    <p>{name}</p>
                    <p>{description}</p>
                    <p>Price: ₹ {price}</p>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleItemRemove(_id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="col-md-5">Checkout | Payment</div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
