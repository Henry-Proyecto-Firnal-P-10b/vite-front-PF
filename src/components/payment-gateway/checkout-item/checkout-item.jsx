import { useDispatch } from "react-redux";
import styles from "./checkout-item.module.css";
import { clearItemFromCart, addItemToCart, deleteCartItem } from "../../../features/cartSlice/cartSlice";
import { numberFormat } from "../../../helper/numberFormat";
import Swal from "sweetalert2";

const CheckoutItem = ({ cartItem }) => {

  const { title, imageUrl, price, quantity } = cartItem;
  const dispatch = useDispatch();

  const clearItemHandler = () => {
    Swal.fire({
      title: 'Esta seguro de eliminar este producto?',
      text: "No sera posible revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: '#1ac8db',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminalo!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Eliminado!',
          'Tu producto ha sido eliminado.',
          'success'
        )
        dispatch(clearItemFromCart(cartItem))
      }
    })

  };
  const addItemHandler = () => dispatch(addItemToCart(cartItem));
  const removeItemHandler = () => dispatch(deleteCartItem(cartItem));


  return (
    <div className={styles.checkoutItemContainer}>
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={title} />
      </div>
      <span className={styles.name}>{title}</span>
      <span className={styles.quantity}>
        <div className={styles.arrow} onClick={removeItemHandler}> &#10094;</div>
        <span className={styles.value}>{quantity}</span>
        <div className={styles.arrow} onClick={addItemHandler}>&#10095;</div>
      </span>
      <span className={styles.price}>{numberFormat(price)}</span>
      <div className={styles.removeButton} onClick={clearItemHandler}>
        &#10005;
      </div>
    </div>
  )
}

export default CheckoutItem