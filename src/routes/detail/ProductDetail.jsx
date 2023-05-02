import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom'
import { Box, Typography, Button, Stack, Container } from '@mui/material';

const DetailProduct = () => {

  return <>

    <Container fixed className="detail">
      <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" spacing={2} justifyContent="center" sx={{ px: "2rem", py: "2rem" }}>

        <img src='https://http2.mlstatic.com/D_NQ_NP_656735-MCO48794245078_012022-O.webp' className=" imgDetail" alt={name} />

        <div className=" infDetail">
          <form>
            <Typography variant="h3">
              coche para bebé + silla para carro
            </Typography>

            <hr />

            <div className="infoInicial">
              <p>precio:<span className='money'>$</span><span className='price'>150</span></p>
              <p>estrellas:</p>
              <p>Disponible en stock:<span>si</span></p>
              <Stack direction="row" >
                <p>Cantidad:</p>
                <input type="number" min='0' className="cant" />
              </Stack>
              <Stack direction="row" alignContent={'center'} gap={2} >
                <Button variant="contained" sx={{ mt: 2, mb: 2 }} startIcon={<AddIcon />}>Ir al carrito</Button>
                <Link to="/carrito/:idCompra">
                  <Button variant="contained" sx={{ mt: 2, mb: 2 }} startIcon={<AddShoppingCartIcon />}>Ir al carrito</Button>
                </Link>
              </Stack>

            </div>
            <hr />
            <div>
              <h3>Tipos de entrega</h3>
              <p>Retiro en tienda:</p>
              <p>Disponible para despacho</p>
            </div>
          </form>
        </div>

      </Stack>

      <Box p={4} borderRadius={8} bgcolor={'#f4f4f4'} mb={2}>
        <Typography fontWeight={500}>
          Caracteristicas del Producto
        </Typography>
        <p className="">Lorem ipsum  dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae tempus quam pellentesque nec nam aliquam sem et tortor.</p>

        <Box pl={2} pr={2} pt={2}>
          <Box>

            <Typography fontWeight={500}>
              Caracteristicas:
            </Typography>
            <Box pl={2}>
              <ul className='caractList'>
                <li>dato1</li>
                <li>dato2</li>
                <li>dato3</li>
                <li>dato4</li>
              </ul>
            </Box>
          </Box>
          <Box>

            <Typography fontWeight={500}>
              Garantía:
            </Typography>
            <Box pl={2}>
              <ul className='caractList'>
                <li>dato1</li>
                <li>dato2</li>
                <li>dato3</li>
                <li>dato4</li>
              </ul>
            </Box>
          </Box>

        </Box>
      </Box>


    </Container>
  </>
}

export default DetailProduct;