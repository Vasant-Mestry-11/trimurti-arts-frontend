import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Spinner = ({ path = "login" }) => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prevCount) => --prevCount);
    }, 1000);

    if (count === 0) {
      navigate(`${path}`, {
        state: location,
      });
    }

    return () => clearInterval(timer);
  }, [navigate, count, location, path]);

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        height: "100vh",
      }}
    >
      <h1>Redirecting to you in {count} seconds</h1>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
