import { useDispatch, useSelector } from "react-redux";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import styles from './payment-form.module.css';
import { clearCart } from "../../../features/cartSlice/cartSlice";
import { numberFormat } from "../../../helper/numberFormat";
import { useNavigate } from "react-router-dom";
import setDataUser from "../../../helper/setDataUser";
import CheckoutItem from "../../../components/payment-gateway/checkout-item/checkout-item"
import { setCartTotal, updateInitialState } from '../../../features/cartSlice/cartSlice'
import { useEffect, useState } from 'react';
import Swal from "sweetalert2";
import emailjs from '@emailjs/browser';

const PaymentForm = () => {

  const cartItems = useSelector(state => state.persistedReducer.carState.cartItems);

  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
    setTotal(newCartTotal);
    dispatch(setCartTotal(newCartTotal));
    dispatch(updateInitialState(cartItems))
  }, [cartItems])

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const currentUser = useSelector(state => state.persistedReducer.userData)
  const uid = useSelector(state => state.currentUser.userCredentials.uid);

//emailJs
const USER_ID="service_8duinll";
const API_KEY= "template_g954u96";
const TEMPLATE_ID= "lp4j5eTKXZNYsZ4jM";

var templateParams = {
  email: currentUser.orderInf.email,
  name: currentUser.orderInf.name,
};


  const sendEmail = (e) =>{
    e.preventDefault()
    emailjs.send(USER_ID, API_KEY, templateParams, TEMPLATE_ID).then((result) => {
      console.log(result.text);
    }, (error) => {
      console.log(error.text)
    });
  };


  const paymentHandler = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }


  useEffect(() => {
    const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
    setTotal(newCartTotal);
    dispatch(setCartTotal(newCartTotal));
    dispatch(updateInitialState(cartItems))
  }, [cartItems])

    const response = await fetch('/.netlify/functions/create-payments-intent', {
      method: 'post',
      headers: {
        'content-Type': 'application/json'
      },
      body: JSON.stringify({ amount: cartTotal * 100 })
    }).then(res => res.json()).catch(error => alert(error));

    const { paymentIntent: { client_secret } } = response;

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser ? `${currentUser.name} ${currentUser.lastName}` : "Guest",
        }
      }
    });

    if (paymentResult.error) {
      Swal.fire({
        title:'Ocurrió un error!',
        text: paymentResult.error.message,
        icon: 'warning',
      })
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        
        const updateDataUser = async () => {
          if(!uid) alert("no hay un usuario");
          await setDataUser("onlinePurchases", cartItems, uid );
        }
        updateDataUser();
        Swal.fire({
          title:'Pago exitoso!',
          icon: 'success',
          showCancelButton: true,
        })
        sendEmail();
        navigate("/");
        dispatch(clearCart());
      }
    }
  };

  return (
    <div>
        <h2>Detalles del pago</h2>
    <div className={styles.PaymentFormContainer} >
      <div className={styles.cardContainer}>
      <div className={styles.paymentFormHeader}>
      </div>
      <form className={styles.FormContainer}  id="creditCardForm" >
        <h4>Card</h4>
        <div className={styles.creditCardContainer}>
          <CardElement />
        </div>
      </form>

        <br/>
      <button form="creditCardForm" type="submit" className={styles.btn} onClick={paymentHandler}>Pagar</button>
        </div>
      <div className={styles.cartContainer}>
      {cartItems?.map((cartItem, index) => (
        <CheckoutItem key={cartItem.id + index} cartItem ={cartItem} />
        ))}
        <span className={styles.total}>Total a pagar <span> {numberFormat(total)}</span> USD</span>
        </div>
    </div>
    </div>
  )
}

export default PaymentForm