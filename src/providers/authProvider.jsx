import { useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import PropTypes from "prop-types";

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("auth"));
    if (data) {
      setAuth({
        user: data.user,
        token: data.token,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};
