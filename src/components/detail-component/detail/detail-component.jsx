import Carousel from "../../carousel/carousel";
import Container from '@mui/material/Container'

import styles from "./detail-component.module.css"
import NoReview from "../no-review/no-review";
import { numberFormat } from "../../../helper/numberFormat";
import HalfRatingPreview from "../../card/rating/rating-preview";
import ReviewComponent from "../review-component/review-component";
import IconButton from '@mui/material/IconButton'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../../features/cartSlice/cartSlice";
import { useState } from "react";
import { useEffect } from "react";
import Button from '@mui/material/Button'
import PostReview from "../post-review/post-review";

const DetailComponent = ({ productDetail }) => {

  const [purchasedProducts, setPurchasedProducts] = useState(null);
  const [review, setReview] = useState(null);
  const [reviewToggle, setReviewToggle] = useState(false);
  const { userData } = useSelector(state => state.persistedReducer.userData);

  useEffect(() => {
    if (userData) {
      setPurchasedProducts(userData.onlinePurchases);
    } else {
      setPurchasedProducts(null)
    }
  }, [userData])

  useEffect(() => {
    if (productDetail.id) {
      setReview(purchasedProducts?.find(product => product.id === productDetail.id));
    }

  }, [productDetail.id, purchasedProducts])


  const {
    name,
    price,
    rating,
    reviews,
    stock,
    categories,
    description,
    imageUrl
  } = productDetail;


  const dispatch = useDispatch();

  const handleClickCart = () => {
    const product = {
      id: productDetail.id,
      title: name,
      imageUrl,
      price
    }
    dispatch(addItemToCart(product));

  }

  const handleClickPostReview = ()=> {
    setReviewToggle(!reviewToggle);
  }

  return (
    <Container maxWidth="xl">
      <div className={styles.carouselContainer}>
        <div className={styles.ImageSliderContainer}>
          <Carousel images={imageUrl} />
        </div>
        <div className={styles.attributes}>
          <h2>{name}</h2>
          <div className={styles.detailsData}>
            <HalfRatingPreview rValue={rating} />
            <p className={styles.price}>{numberFormat(price)}</p>
            <span className={styles.stock}>En stock: {stock}</span>
            <IconButton onClick={handleClickCart}>
              <AddShoppingCartIcon color="primary" />
            </IconButton>
            <span className={styles.categories}>
              {
                categories.map((category, i) => (<p key={`${category}${i}`} >{category}</p>))
              }
            </span>
            <div >
              {
                review && <Button variant="contained" color="primary" sx={{mb:"1rem"}} onClick={handleClickPostReview}>
                  Review
                </Button>
              }
            </div>
            <span className={styles.description}>{description}</span>
          </div>

        </div>
      </div>
      <div className={styles.reviewsContainer}>
        {
          reviewToggle &&
          <PostReview userData={userData} />
        }
         {
          reviews.length ?
            reviews.map((review, index) => (
              <ReviewComponent key={index} review={review} />))
            :
            <NoReview />
        }            
      </div>
    </Container>


  )
}

export default DetailComponent