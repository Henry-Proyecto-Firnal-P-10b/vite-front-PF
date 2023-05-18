import {
  Box,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Typography,
  TableHead,
  Modal,
  Button,
  CardContent,
  Card,
  CardMedia,
  Stack,
  ListItem,
  List,
  Backdrop,
} from '@mui/material'

import { useState } from 'react';
import { useSelector } from 'react-redux'
import { getOrderByid, getUserByid, serveOrder } from '../../../utils/firebase/firebaseClient';


const VentasTotales = () => {
  const { orders } = useSelector(state => state.orders)//todas las ordenes
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState({}); // la orden seleccionada
  const [listProducts, setlistProducts] = useState([])// lista de productos por orden 
  //const [numberTracking , setnumberTracking] = useState('')
  const [user, setUser] = useState([])
  const [date, setDate] = useState([])

  const handleDispatch = async (id) => {
    const { dataOrder, products } = await getOrderByid(id)

    getUserByid(dataOrder.idClient, dat => {
      setUser(dat.data())
    })

    await setOrder(dataOrder);
    setlistProducts(products)
    setOpen(true);
    setDate(dataOrder.date.toDate())
  }
  const changeStatus = (value) => {
    const obj = {
      date: order.date,
      id_order: order.id_order,
      status: value,
      products: order.products,
      totalPrice: order.totalPrice,
      totalProducts: order.totalProducts,
      //  numberTracking : numberTracking
    }
    serveOrder(order, obj);
  }
  const handleCloseModal = (inf) => {
    if (inf.target.value) {
      setOpen(false);
      changeStatus(inf.target.value);
    } else {
      setOpen(false);
    }

  }
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "75%",
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const orderModal = (
    <Box sx={style}>
      <Box
        justifyContent="center"
        alignItems={"center"}
        sx={{ minHeight: "55vh" }}>
        <Box justifyItems={"center"}>
          <Typography variant="h6" color="initial" align="center">
            ORDEN
          </Typography>
          <Card sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="subtitle1" color="text.secondary">
                  Cliente : {user.displayName}
                </Typography>
                <Typography component="div" variant="subtitle1" color="text.secondary">
                  Fecha : {date?.toLocaleString('es-co')}
                </Typography>
              </CardContent>
            </Box>
          </Card>
          <List sx={{

            position: 'relative',
            overflow: 'auto',
            maxHeight: 300,

          }}>
            {listProducts?.map((dat, i) =>
            (
              <ListItem key={`${dat.id}+${i}`} sx={{ display: 'flex', width: "100%" }} >
                <Card sx={{ display: 'flex', marginBottom: "10px", width: "100%" }} >
                  <CardMedia
                    component="img"
                    sx={{ width: 90, margin: "10px" }}
                    image={dat.imageUrl[0]}
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'column', marginBlockStart: "10px" }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                      <Typography component="div" variant="h6">
                        {dat.name}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary" component="div">
                        ${dat.subTotal} x {dat.quantity} u.
                      </Typography>
                    </CardContent>

                  </Box>

                </Card>
              </ListItem>
            )
            )}
          </List>
          <Typography margin="10px" align='right' component="div" variant="subtitle1">
            Total :$ {order.totalPrice}
          </Typography>


          <Typography margin="10px" align='left' component="div" variant="h5">
            Datos de envio
          </Typography>

          <Typography margin="10px" align='left' component="div" variant="subtitle1">
            Direccion : {user.userData?.address}
          </Typography>
          <Typography margin="10px" align='left' component="div" variant="subtitle1">
            Ciudad : {user.userData?.city}
          </Typography>
          <Typography margin="10px" align='left' component="div" variant="subtitle1">
            Codigo postal : {user.userData?.zipCode}
          </Typography>
          <Typography margin="10px" align='left' component="div" variant="subtitle1">
            Telefono : {user.userData?.phoneN}
          </Typography>

        </Box>
      </Box>
      <Stack spacing={2} direction="row" justifyContent="right" >
        {order.status === "Pendiente" && <Button
          type="submit"
          variant="contained"
          onClick={handleCloseModal}
          value="Preparando"
        >
          Preparar
        </Button>}
        {order.status === "Preparando" && <Button
          type="submit"
          variant="contained"
          onClick={handleCloseModal}
          value="Enviado"
        >
          Enviar
        </Button>}
        {order.status === "Enviado" && <Button
          type="submit"
          variant="contained"
          onClick={handleCloseModal}
          value="Terminado"
        >
          Terminar
        </Button>}
        <Button
          align="center"
          type="submit"
          variant="contained"
          onClick={handleCloseModal}
          value=""
        >


          Cerrar
        </Button>
      </Stack>
    </Box>
  );
  return (
    <div>
      <Box
        component="main"
        sx={{
          width: "50%",
          alignContent: "center",
          display: "flex",
          justifyContent: "center",
          mx: "25%",
          mt: "2%",
        }}
        textAlign={"center"}
        boxShadow={3}
        alignContent={"center"}
        bgcolor={"primary"}
      >
        <Typography variant="h6" color="initial" align="center">
          ORDENES NUEVAS
        </Typography>
      </Box>
      <Stack sx={{ alignItems: "center" }}>
        <TableContainer component={Paper} sx={{ maxWidth: 800, mt: "1%" }}>
          <Table sx={{/*  minWidth: 650 */ }} size="small" aria-label="a dense table">
            <TableHead bgcolor="#e3f2fd">
              <TableRow>
                <TableCell align="center">ORDEN</TableCell>
                <TableCell align="center">FECHA</TableCell>
                <TableCell align="center">ESTADO</TableCell>
                <TableCell align="center">CANTIDAD</TableCell>
                <TableCell align="center">TOTAL</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders?.map((row, i) => row.status !== "Terminado" ? (
                <TableRow
                  key={`${row.id}+${i}`}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" > {row.id_order} </TableCell>
                  <TableCell align="center" > {row.date.toDate().toLocaleString('es-co')} </TableCell>
                  <TableCell align="center"> {row.status} </TableCell>
                  <TableCell align="center">{row.totalProducts}</TableCell>
                  <TableCell align="center">${row.totalPrice}</TableCell>
                  <TableCell align="center">
                    <Button
                      aria-label="edit"
                      size="small"
                      onClick={() => handleDispatch(row.id)}
                    >
                      Verificar
                    </Button>
                  </TableCell>
                </TableRow>
              ) : (null))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
      <Box
        component="main"
        sx={{
          width: "50%",
          alignContent: "center",
          display: "flex",
          justifyContent: "center",
          mx: "25%",
          mt: "2%",
        }}
        textAlign={"center"}
        boxShadow={3}
        alignContent={"center"}
        bgcolor={"primary"}
      >
        <Typography variant="h6" color="initial" align="center">
          ORDENES FINALIZADAS
        </Typography>
      </Box>
      <Stack sx={{ alignItems: "center" }}>
        <TableContainer component={Paper} sx={{ maxWidth: 800, mt: "1%" }}>
          <Table sx={{/*  minWidth: 650 */ }} size="small" aria-label="a dense table">
            <TableHead bgcolor="#e3f2fd">
              <TableRow>
                <TableCell align="center">ORDEN</TableCell>
                <TableCell align="center">FECHA</TableCell>
                <TableCell align="center">ESTADO</TableCell>
                <TableCell align="center">CANTIDAD</TableCell>
                <TableCell align="center">TOTAL</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders?.map((row, i) => row.status === "Terminado" ? (
                <TableRow
                  key={`${row.id}+${i}`}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" scope="row"> {row.id_order} </TableCell>
                  <TableCell align="center" > {row.date.toDate().toLocaleString('es-co')} </TableCell>
                  <TableCell align="center"> {row.status} </TableCell>
                  <TableCell align="center">${row.totalPrice}</TableCell>
                  <TableCell align="center">{row.totalProducts}</TableCell>
                  <TableCell align="center">

                  </TableCell>
                </TableRow>
              ) : (null))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
      <Modal

        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        open={open} >
        {orderModal}
      </Modal>
    </div>
  )
}

export default VentasTotales;
