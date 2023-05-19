
import {
  Box,
  Typography,
  CardContent,
  Card,
  CardMedia,
  Stack,
  Divider,
} from '@mui/material'

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import timeStampToDate from '../../helper/timeStampToDate';

const Compras = () => {
  const data = useSelector((state) => state.currentUser.userCredentials);
  const userData = useSelector((state) => state.persistedReducer.userData.userData);
  const [listProducts, setlistProducts] = useState([])// lista de productos por orden 

  useEffect(() => {
    setlistProducts(userData.onlinePurchases)
  }, [])

  return (
    <div>
      <Box
        component="main"
        sx={{
          display: "flex",
          mx: "25%",
          mt: "2%",
          marginBottom: 10
        }}
      >
      </Box>
      <Stack sx={{ alignItems: "center" }}>
        <Typography variant="h6" color="initial" align="center">
          Mis Compras
        </Typography>
        {listProducts?.map((dat, i) =>

          <Card sx={{ width: "80%", marginBottom: "20px", marginTop: "20px" }} key={`${i}`}>
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ display: 'grid', flexDirection: 'row', width: "92%" }}>
                <CardContent>
                  <Typography component="div" variant="subtitle1" color="text.secondary">
                    {timeStampToDate(dat.date)}
                  </Typography>
                </CardContent>
              </Box>
            </Box>
            <Divider />
            {dat.products?.map((prod, i) =>
              <Box sx={{ display: 'flex', width: "100%" }} key={`${prod.title}+${i}`} >
                <CardMedia
                  component="img"
                  sx={{ width: 90, height: "auto", margin: "10px" }}
                  image={prod.imageUrl}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', marginBlockStart: "10px" }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h10">
                      {prod.title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                      ${prod.price} x {prod.quantity} u.
                    </Typography>
                    {dat.status === "Terminado" ? (<Typography variant="subtitle1" color="green" component="div">
                      Entregado
                    </Typography>) : (<Typography variant="subtitle1" color="text.secondary" component="div">
                      {dat.status}
                    </Typography>)}
                  </CardContent>
                </Box>
              </Box>
            )}
          </Card>
        )
        }
      </Stack>
    </div>
  )
}

export default Compras;