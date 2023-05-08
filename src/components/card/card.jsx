//react Imports
import { useRef } from "react";
import { Link } from "react-router-dom";
//mui Components
import Card from "@mui/material/Card";
import CardMedia from '@mui/material/CardMedia';
import CardActions from "@mui/material/CardActions";
import { CardContent, CardHeader, IconButton, Typography, Box, Button } from "@mui/material";
//Icons 
import FavoriteIcon from '@mui/icons-material/Favorite';
import Sale from "./sale/sale";
import HalfRatingPreview from "./rating/rating-preview";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
//Helpers
import { numberFormat } from "../../helper/numberFormat";
//redux 
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../features/cartSlice/cartSlice";


const CardInf = (
  {
    imageUrl,
    title,
    price,
    sale,
    rating,
    id,    
  }
) => {
const userData = useSelector((state) => state.currentUser.userCredentials)
  const onSale = useRef(false);
  const dispatch = useDispatch();


  if (Object.keys(sale).length !== 0) {
    onSale.current = true;
  }else{
    onSale.current = false;
  }

  price = Number(price);
  

  const handleClickCartIcon = () => {
    
    const product = {
      id,
      title,
      imageUrl,
      price      
    }   
 dispatch(addItemToCart(product));
   

   
  }

  return (
    <Card sx={{ minWidth: "300px", margin:"1rem"}} >
      <CardMedia
        component="img"
        title={title}
        src={imageUrl}
        alt={title}
        sx={{ maxHeight: "220px", width: "100%", objectFit: "cover"}}
      />
      <CardContent  sx={{py:0}}>
        <CardHeader title={title} sx={{ padding: 0, userSelect:"none" }} />
        <Box 
          display={"flex"}
          flexDirection={"column"}
          minHeight={130}
          justifyContent={"space-between"}
          alignItems={"flex-start"}
        >
          {
            onSale.current
              ? <Sale price={price} sale={sale} />
              : <Typography variant="h5" color="initial" sx={{userSelect:"none"}}>{numberFormat(price)}</Typography>
          }
          {
            onSale.current
            && <Box sx={{ display: "flex" }}>
              <Typography
                variant="body1"
                sx={{
                  textDecorationLine: "line-through",
                  paddingRight: "1rem",
                  userSelect:"none"
                }}
              >
                {`${numberFormat(price)}`}
              </Typography>
              <Box
                component="span"
                sx={{
                  paddingTop: "0.125rem",
                  paddingBottom: "0.125rem",
                  paddingLeft: "0.375rem",
                  paddingRight: "0.375rem",
                  backgroundColor: "rgba(26, 200, 219,0.7)",
                  color: "#ffffff",
                  fontSize: "0.875rem",
                  lineHeight: "1.25rem",
                  borderRadius: "0.375rem",
                  userSelect:"none"
                }}>
                {`save ${sale.discount}%`}
              </Box>
            </Box>
          }

          <Box>            
            <HalfRatingPreview rValue={rating}/>
          </Box>
          <CardActions sx={{padding:0}}>
            <Link to={`/detail/${id}`}>
              <Button variant="contained" color="primary">
                Details
              </Button>
            </Link>
            <IconButton>
              <FavoriteIcon color="warning" />
            </IconButton>
            <IconButton onClick={handleClickCartIcon}>
              <AddShoppingCartIcon color="primary" />
            </IconButton>
          </CardActions>
        </Box>

      </CardContent>

    </Card>

  )
}

export default CardInf