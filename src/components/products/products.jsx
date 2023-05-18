import Container from '@mui/material/Container'
import CardInf from "../../components/card/card"
import { Grid } from '@mui/material'
import { PaginationComponent } from '../../components/pagination/pagination'
import { useSelector } from 'react-redux'
import Filters from '../filters/filters'


import styles from "./products.module.css"
import Loader from '../loader/loader'

const Products = () => {

  const products = useSelector((state) => state.productPag.productsPag)
  return (
    <>
      <div className={styles.dropListContainer}>
        <span className={styles.dropListFilters}>Filtros</span>
        <Filters />
      </div>
      <article>
        <Container maxWidth="xl" sx={{ minHeight: "100vh", pt: "2rem" , marginTop:"80px" }}>
          <Grid container justifyContent={"center"} >
            {
              products.length ? products.map((products, i) => (
                <CardInf
                  key={`${products.id}+${i}`}
                  id={products.id}
                  imageUrl={products.imageUrl[0]}
                  categories={products.categories}
                  title={products.name}
                  price={products.price}
                  sale={products.sale}
                  rating={products.rating}
                  reviews={products.reviews}
                  stock={products.stock}
                />
              )) : <Loader />
            }
          </Grid>
          <Grid  >
            <PaginationComponent />
          </Grid>

        </Container>
      </article>

    </>
  )
}

export default Products