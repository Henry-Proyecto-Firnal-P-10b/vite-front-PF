import { Container, Typography } from "@mui/material"
import styles from "./checkout.module.css";
import CheckoutForm from "../../components/payment-gateway/checkout-form/checkout-form";

const Checkout = () => {
  return (    
    <Container maxWidth="md" sx={{mt:"80px"}}>
      <Typography variant="h3" color="primary" align="center">Checkout</Typography>
      <div className={styles.containerFormCheckout}>
        <CheckoutForm />
      </div>
    </Container>
  )
}

export default Checkout