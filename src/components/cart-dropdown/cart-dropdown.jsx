import Button from '@mui/material/Button'

import styles from "./cart-dropdown.module.css";
import CardItem from "../card-item/card-item";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';



const CartDropdown = ({isToggleCartOn}) => {
  
  const cartItems  = useSelector(state=> state.persistedReducer.carState.cartItems);
  
  return (
    <div className={`${isToggleCartOn ? styles.cartDropdownContainer : styles.isClose}`}>
      <div className={styles.cartItems}>
        {cartItems?.map((item) => (                           
            <CardItem key={item.id} cardItem={item}/>
        ))}
      </div>
      <Button variant="contained"><Link to="shop/cart" className={styles.linkButton}>proceder al pago</Link></Button>
    </div>
  )
}

export default CartDropdown