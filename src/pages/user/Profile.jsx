import axios from "axios";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import useGetURL from "../../hooks/useGetURL";
import { useEffect, useState } from "react";

const Profile = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    answer: "",
  });
  const [auth] = useAuth();
  const url = useGetURL();

  useEffect(() => {
    const { name, email, password, phone, address } = auth.user;
    setUserDetails({
      name, email, password, phone, address
    })
  }, [auth.user]);

  const { name, email, password, phone, address } = userDetails;

  const handleChange = (e) => {
    setUserDetails((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/auth/register`, {
        name,
        email,
        password,
        phone,
        address,
      });
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Dashboard - Profile">
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div>
              <form onSubmit={handleSubmit}>
                <h4>User Profile</h4>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputName"
                    placeholder="Enter Name"
                    value={name}
                    name="name"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail"
                    placeholder="Enter email"
                    value={email}
                    name="email"
                    onChange={handleChange}
                    required
                    disabled
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Enter Password"
                    value={password}
                    name="password"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputPhone"
                    placeholder="Enter Phone no"
                    value={phone}
                    name="phone"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputAddress"
                    placeholder="Enter address"
                    name="address"
                    value={address}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
