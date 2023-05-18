import { Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import CardInf from "../../card/card";
import Loader from "../../loader/loader";


const ProductsByRaiting = () => {
  const { products } = useSelector(state => state.products);
  const sortedProductsByRating = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4)
  return (  
    
    <div>
      <Typography variant="h3" color="primary" align="center" mt={"2rem"}>Productos imperdibles</Typography>
      <Grid container justifyContent={"center"}  >
        {
          sortedProductsByRating.length ? sortedProductsByRating.map((sortedProductsByRating, i) => (
            <CardInf
              key={`${sortedProductsByRating.id}+${i}`}
              id={sortedProductsByRating.id}
              imageUrl={sortedProductsByRating.imageUrl[0]}
              title={sortedProductsByRating.name}
              price={sortedProductsByRating.price}
              sale={sortedProductsByRating.sale}
              rating={sortedProductsByRating.rating}
            />
          )) : <Loader />
        }
      </Grid>
    </div>
  )
}

export default ProductsByRaiting