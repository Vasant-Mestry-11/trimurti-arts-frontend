import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import toast from "react-hot-toast";
import useGetURL from "../../hooks/useGetURL";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const url = useGetURL();
  const [auth] = useAuth();

  useEffect(() => {
    const getOrders = async () => {
      try {
        const { data } = await axios.get(`${url}/auth/orders`);
        const { success, orders } = data;
        if (success) {
          setOrders(orders);
        }
      } catch (error) {
        console.log(error);
        toast.error(error);
      }
    };

    if (auth?.token) {
      getOrders();
    }
  }, [url, auth?.token]);

  return (
    <Layout title="Dashboard - Orders">
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">Orders</h1>
            <div className="mt-4">
              {orders.map((o, i) => (
                <div className="border shadow" key={o._id}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createdAt).fromNow()}</td>
                        <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="container">
                    {o?.products?.map(({ _id, name, description, price }) => {
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
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
