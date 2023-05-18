import Container from '@mui/material/Container'
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import styles from './productDetail.module.css';
import { useEffect, useState } from 'react';

import noAvialableProduct from "../../utils/img/producto-no-disponible.png";
import Typography from '@mui/material/Typography'
import DetailComponent from '../../components/detail-component/detail/detail-component';
import { getProductByid } from '../../utils/firebase/firebaseClient';
import Loader from '../../components/loader/loader';

const DetailProduct = () => {
  const { id } = useParams()
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setIsLoading(true);
    getProductDetail(id);
  }, [id])

  

  const getProductDetail = async (id) => {
    try {
      await getProductByid(id,dat =>{        
        setProduct(dat.data())
      })          

      setIsLoading(false)
    } catch (error) {
      console.error(error);
    }
  }




  return (
    isLoading ? <Loader /> :

    product.active
      ?
      <Container maxWidth="xl" sx={{marginTop:"80px"}}>
        <div className={styles.detailContainer}>
          <DetailComponent productDetail = {product} productId={id} />
        </div>
      </Container>
      :
      <Container maxWidth="xl" sx={{marginTop:"80px"}}>
        <div className={styles.detailContainer}>
          <h2>Producto no displonible</h2>
          <img src={noAvialableProduct} alt="noAvialableProduct" />
          <Typography variant="h2" align='center'>Disculpe las molestias</Typography>
          <Link to="/shop">Home</Link>
        </div>
      </Container>
  )
}

export default DetailProduct;