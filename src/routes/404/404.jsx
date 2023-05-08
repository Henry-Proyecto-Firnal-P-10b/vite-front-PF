//Imagenes 
import BabyCrying from "../../utils/img/crying.png";
//Material UI 
import { Container, Stack, Typography, Box } from "@mui/material";


const Error = () => {
    return (<Box bgcolor="#47dbd6" sx={{ height: '100vh' }}>

        <Container fixed>
            <Stack flexDirection={"column"} alignItems={'center'} spacing={2} justifyContent="center" >
                <Typography color="white" variant='h2' textAlign="center">Lo sentimos, la pagína que buscas no está disponible</Typography>
                <img className='babyCrying' src={BabyCrying} alt={404} />
                <Typography variant="h2" color="white" textAlign="center">error 404</Typography>
            </Stack>
        </Container>
    </Box>)

}

export default Error;