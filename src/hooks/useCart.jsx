import { useContext } from "react";
import { CartContext } from "../context/cartContext";

const useCart = () => useContext(CartContext);

export default useCart;
