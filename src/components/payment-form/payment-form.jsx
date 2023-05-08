import { useState } from "react";
import { useSelector } from "react-redux";


import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import styles from './payment-form.module.css';
const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const amount = useSelector(state => state.cart.cartTotal)
  const currentUser = useSelector(state => state.currentUser.userCredentials )
  const [isProcessingPayment, setIsProcessingPayment ] = useState(false);
  
  const paymentHandler = async (e) => {    
    e.preventDefault();
    if(!stripe || !elements){
      return;      
    }
    setIsProcessingPayment(true);
    
    const response = await fetch('/.netlify/functions/create-payments-intent', {
      method:'post',
      headers:{
        'content-Type': 'application/json'
      },
      body: JSON.stringify({ amount: amount * 100 })
    }).then(res => res.json());    
    const {paymentIntent: { client_secret }} = response;

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement), 
        billing_details:{
          name: currentUser ? currentUser.displayName : "Guest", 
        }
      }
    });
    
    setIsProcessingPayment(false);

    if (paymentResult.error) {
      console.log(paymentResult.error)
      alert(paymentResult.error);      
    }else{
      if(paymentResult.paymentIntent.status === "succeeded"){
        alert("paymet Succesfull");
      }
    }
  };
  
  


  return (
    <div className={styles.PaymentFormContainer} >
      <form className={styles.FormContainer} onSubmit={paymentHandler} >
        <h2>Credit card</h2>
        <CardElement />
        <button disabled={isProcessingPayment} type="submit">Pagar ahora</button>
      </form>
    </div>
  )
}

export default PaymentForm