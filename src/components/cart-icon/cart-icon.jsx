import { Link } from "react-router-dom";
import styles from "./cart-icon.module.css";
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { useSelector } from "react-redux";

const CartIcon = () => {

  const cartItems = useSelector(state => state.persistedReducer.carState.cartItems);

  const newCartCount = cartItems.reduce((total, cartItem)=> total + cartItem.quantity , 0)
  
  return (    
    <Link>
      <ShoppingBagOutlinedIcon />
      <span className={styles.itemCount}>{newCartCount<100?newCartCount: "+99" }</span>        
    </Link>
  )
}

export default CartIcon