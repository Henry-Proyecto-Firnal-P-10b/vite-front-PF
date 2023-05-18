import SignInForm from '../../components/sign-in-form/sign-in-form';
import Container from '@mui/material/Container'
import { useTheme } from '@emotion/react';
import { Grid} from '@mui/material';


const Authentication = () => {
  const theme = useTheme();

  return (    

    <Container 
    maxWidth="xl" 
    sx={{
      height: (`calc(100vh - ${theme.spacing(10)})`),      
      marginTop: "80px"
    }}              
    >       
        <Grid container spacing={2} justifyContent={"center"} alignContent={"center"} sx={{height:"100%"}} >
          <SignInForm />
        </Grid>               
      </Container>
      
      
  );
};

export default Authentication;