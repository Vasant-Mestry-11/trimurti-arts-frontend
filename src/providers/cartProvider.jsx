import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { CartContext } from "../context/cartContext";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let existingItem = localStorage.getItem("cart");
    if (existingItem) setCart(JSON.parse(existingItem));
  }, []);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node,
};
