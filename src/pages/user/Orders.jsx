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

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${url}/auth/orders`);
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

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
                        <td scope="col">#</td>
                        <td scope="col">Status</td>
                        <td scope="col">Buyer</td>
                        <td scope="col">Date</td>
                        <td scope="col">Payment</td>
                        <td scope="col">Quantity</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>{i + 1}</th>
                        <th>{o?.status}</th>
                        <th>{o?.buyer?.name}</th>
                        <th>{moment(o?.createdAt).fromNow()}</th>
                        <th>{o?.payment?.success ? "Success" : "Failed"}</th>
                        <th>{o?.products?.length}</th>
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
