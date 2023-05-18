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
import PostReview from "../post-review/post-review";

import { v4 } from "uuid";

const DetailComponent = ({ productDetail, productId }) => {
  

  const [purchasedProducts, setPurchasedProducts] = useState();
  const [bought, setBought] = useState(false);

  const { userData } = useSelector(state => state.persistedReducer.userData);
  const { name, price, rating, reviews, stock, categories, description, imageUrl } = productDetail;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userData) return;
    if (!userData?.onlinePurchases.length) return setPurchasedProducts(null)

    const purchases = userData?.onlinePurchases
    const allProducts = [];

    purchases.forEach(purchase => {
      const { products } = purchase;
      products.forEach(product => {        
        allProducts.push(product);
      })
    })

    setPurchasedProducts(allProducts)

  }, [userData])

  useEffect(() => {
    if (!purchasedProducts) return;    
    setBought(!!purchasedProducts.find(({id}) => id === productId )); 
  }, [ productId, purchasedProducts])
  const handleClickCart = () => {
    const product = {
      id: productId,
      title: name,
      imageUrl,
      price
    }
    dispatch(addItemToCart(product));
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
            </div>
            <span className={styles.description}>{description}</span>
          </div>
        </div>
      </div>
      <div className={styles.reviewsContainer}>
        {
          bought && <PostReview userData={userData} uid={productId} />
        }
        {reviews.length !== 0
          ? reviews.map((review) => <ReviewComponent key={v4()} reviewInf={review} />)
          : <NoReview />
        }
      </div>
    </Container>


  )
}

export default DetailComponent