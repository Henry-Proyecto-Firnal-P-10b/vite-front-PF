import SignUpForm from '../../components/sign-up-form/sign-up-form';
import Container from '@mui/material/Container'
import { useTheme } from '@emotion/react';
import { Grid} from '@mui/material';

const SignUp = () => {
  const theme = useTheme();

  return (    

    <Container 
    maxWidth="xl" 
    style={{
      height: (`calc(100vh - ${theme.spacing(10)})`),   
      marginTop: "80px"              
    }}              
    >       
        <Grid container spacing={2} justifyContent={"center"} alignContent={"center"} sx={{height:"100%"}} >
          <SignUpForm />
        </Grid>               
      </Container>
      
      
  );
};

export default SignUp;