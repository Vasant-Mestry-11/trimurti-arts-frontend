import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h1>Dashboard</h1>
          <NavLink to="/dashboard/user/profile" className="list-group-item">
            Profile
          </NavLink>
          <NavLink to="/dashboard/user/orders" className="list-group-item">
            Orders
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
