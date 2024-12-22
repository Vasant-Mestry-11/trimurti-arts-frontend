import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";
import useGetURL from "../hooks/useGetURL";
import DropIn from "braintree-web-drop-in-react";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Cart = () => {
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const navigate = useNavigate();
  const url = useGetURL();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

  const handleItemRemove = (id) => {
    let temporaryCart = [...cart];
    let index = temporaryCart.findIndex((item) => item._id === id);
    temporaryCart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(temporaryCart));
    setCart(temporaryCart);
  };

  const totalPrice = () => {
    const total = cart.reduce((acc, curr) => {
      return acc + curr.price;
    }, 0);
    return total.toLocaleString("en-US", {
      style: "currency",
      currency: "INR",
    });
  };

  useEffect(() => {
    const getToken = async () => {
      try {
        const { data } = await axios.get(`${url}/product/braintree/token`);
        setClientToken(data?.clientToken);
      } catch (error) {
        console.log(error);
        toast.error("Failed to get token");
      }
    };

    getToken();
  }, [auth?.token, url]);

  const handlePayment = async () => {
    setLoading(true);
    try {
      // const { nonce } = await instance.requestPaymentMethod();
      // const { data } = await axios.post(
      //   `${url}/product/braintree/payment/${nonce}`,
      //   {
      //     nonce,
      //     cart,
      //   }
      // );

      // console.log("================= ", data);

      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed");
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      setLoading(false);
    }
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
          <div className="col-md-5 text-center">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total: {totalPrice()}</h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth.user.address}</h5>
                  <button
                    className="btn btn-outline-info"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update address
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mb-4">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-info"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-info"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Login to checkout
                    </button>
                  )}
                </div>
              </>
            )}
            <div className="m-2">
              {/* TODO: Link paypal sandbox to resolve the errors */}
              {!clientToken || !cart.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => {
                      setInstance(instance);
                    }}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={handlePayment}
                    // disabled={!loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing" : "Make payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
