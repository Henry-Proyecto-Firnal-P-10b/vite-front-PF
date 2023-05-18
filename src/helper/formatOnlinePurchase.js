import { v4 } from "uuid";
const formatOnlinePurcase = (cartItems, total) => {
  const onlinePurchases = [];
  const newPruchase = {
    date : new Date(),
    orderId: v4(),
    products: cartItems,
    status:"pendiente",
    totalPrice: total,
    totalProducts: cartItems.length
  }
  
  onlinePurchases.push(newPruchase);

  return onlinePurchases;
}

export default formatOnlinePurcase;