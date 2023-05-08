import { Container, Typography } from "@mui/material"
import styles from "./checkout.module.css";


const Checkout = () => {
  return (
    <Container maxWidth="xl">

      <Typography variant="h3" color="primary" align="center">Checkout</Typography>
      <div className={styles.containerFormCheckout}>

      </div>
    </Container>
  )
}

export default Checkout