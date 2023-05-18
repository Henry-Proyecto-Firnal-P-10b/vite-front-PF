import timeStampToDate from "../../../helper/timeStampToDate"
import HalfRatingPreview from "../../card/rating/rating-preview";
import styles from "./review-component.module.css"
const ReviewComponent = ({reviewInf}) => {
  const {review, date, user, rating} = reviewInf;
  
  const publishedIn = timeStampToDate(date);

  return (
    <div className={styles.reviewContainer}>
      <div className={styles.reviewHead}>
        <span className={styles.reviewUser}>{user}</span>
        <span>{publishedIn}</span>
      </div>
      <span className={styles.review}>{review}</span>
      <div className={styles.reviewFooter}> 
        <span>
        <HalfRatingPreview rValue={rating}/>  
        </span>       
      </div>
    </div>
  )
}

export default ReviewComponent
