import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";

const Cart = () => {
  const [cart] = useCart();
  const [auth] = useAuth();
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container m-3">
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
      </div>
    </Layout>
  );
};

export default Cart;
