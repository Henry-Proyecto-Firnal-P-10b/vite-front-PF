import { useDispatch, useSelector } from "react-redux";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import styles from './payment-form.module.css';
import { clearCart } from "../../../features/cartSlice/cartSlice";
import { numberFormat } from "../../../helper/numberFormat";
import { useNavigate } from "react-router-dom";
import setDataUser from "../../../helper/setDataUser";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {cartTotal, cartItems} = useSelector(state => state.persistedReducer.carState);
  const currentUser = useSelector(state => state.persistedReducer.userData.userInf)
  const uid = useSelector(state => state.currentUser.userCredentials.uid);
  //emailJs
  const USER_ID="service_8duinll";
  const API_KEY= "template_g954u96";
  const TEMPLATE_ID= "lp4j5eTKXZNYsZ4jM";

  var templateParams = {
    email: currentUser.email,
    name: currentUser.displayName,
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
      alert(paymentResult.error.message);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        
        const updateDataUser = async () => {
          if(!uid) alert("no hay un usuario");
          await setDataUser("onlinePurchases", cartItems, uid );
        }
        updateDataUser();
        sendEmail();
        alert("Pago exitoso gracias por su compra!");
        navigate("/");
        dispatch(clearCart());
      }
    }
  };


  return (
    <div className={styles.PaymentFormContainer} >

      <div className={styles.paymentFormHeader}>
        <h2>Ingrese sus datos de pago</h2>
        <span>Total a pagar <span> {numberFormat(cartTotal)}</span> USD</span>
      </div>
      <form className={styles.FormContainer} onSubmit={paymentHandler} id="creditCardForm" >
        <h4>Credit card</h4>
        <div className={styles.creditCardContainer}>
          <CardElement />
        </div>
      </form>
      <button form="creditCardForm" type="submit" className={styles.btn}>Pagar ahora</button>
    </div>
  )
}

export default PaymentForm