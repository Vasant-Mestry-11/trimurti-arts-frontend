import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";
import useGetURL from "../../hooks/useGetURL";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);

  const [auth] = useAuth();

  const url = useGetURL();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(`${url}/auth/user-auth`);
      if (res?.data?.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };

    if (auth?.token) {
      authCheck();
    }
  }, [ok, auth?.token]);
  return ok ? <Outlet /> : <Spinner />;
}
