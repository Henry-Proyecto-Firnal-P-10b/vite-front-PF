import { numberFormat } from "../../helper/numberFormat";
import styles from "./card-item.module.css";

const CardItem = ({cardItem}) => {
  const {title,imageUrl, price ,quantity} = cardItem;  
  
  return (
    <div className={styles.cartItemContainer}>
      <img src={imageUrl} alt={title} />
      <div className={styles.itemDetails}>
        <span className={styles.name}>{title}</span>
        <span className={styles.price}>
          {quantity} x {numberFormat(price)}
        </span>        
      </div>      
    </div>
  )
}

export default CardItem