import toast from "react-hot-toast";
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    newPassword: "",
    answer: "",
  });

  const { email, newPassword, answer } = userDetails;

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserDetails((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8080/api/v1/auth/forgot-password`,
        {
          email,
          newPassword,
          answer,
        }
      );
      if (res?.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="forgot password - Ecommerce App">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1 className="title">Forgot Password</h1>

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
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="exampleInputNewPassword"
              placeholder="Enter New Password"
              value={newPassword}
              name="newPassword"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputAnswer"
              placeholder="Enter your favorite sport name"
              value={answer}
              name="answer"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-secondary">
            Reset
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
