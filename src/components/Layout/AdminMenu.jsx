import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h4>Admin Panel</h4>
          <NavLink
            to="/dashboard/admin/create-category"
            className="list-group-item"
          >
            Create Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            className="list-group-item"
          >
            Create Product
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-users"
            className="list-group-item"
          >
            Users
          </NavLink>
          <NavLink to="/dashboard/admin/products" className="list-group-item">
            Products
          </NavLink>
          <NavLink
            to="/dashboard/admin/admin-orders"
            className="list-group-item"
          >
            Order
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
