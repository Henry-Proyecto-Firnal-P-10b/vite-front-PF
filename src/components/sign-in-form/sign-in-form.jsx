//Material UI
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
//Firebase
import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebaseClient';
import { Link, useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';
//Forms
import { useForm } from 'react-hook-form';

const SignInForm = () => {

  const form = useForm({
    defaultValues:{
      email: "",
      password: ""  
    }  
  });

  const { register, handleSubmit, formState: {errors} } = form;
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      await signInWithGooglePopup();
      navigate("/");
    } catch (error) {
      console.error(error)
    }
  };

  const onSubmitEmailAndPassword = async ({email,password}) => {
    
    try {
      await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      navigate("/");
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('contraseña incorrecta');
          break;
        case 'auth/user-not-found':
          alert('Ninguna usuario asociado con este correo electrónico');
          break;
        default:
          alert('inicio de sesión de usuario fallido', error);
      }
    }
  }




  return (
    <Grid item md={8} xs={10}>      
      <Typography variant="h4" color="initial" align='center'>
        ¿Ya tienes una cuenta?
      </Typography>
      <Typography variant='body1' color="initial" align='center' marginBottom={4}>
        Inicia sesión con tu correo electrónico y contraseña
      </Typography>
      
        <form onSubmit={handleSubmit(onSubmitEmailAndPassword)} noValidate>
          <Stack spacing={2}>
            <TextField
              label='Correo electrónico'
              type='email'
              autoComplete=""
              required                                       
              
              {...register("email", {required:"Por favor, ingrese una dirección de correo electrónico"})}   
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              label='Contraseña'
              type='password'
              autoComplete=""
              required                                                
              {...register("password", {required:"Por favor, ingrese una contraseña"})}
              error={!!errors.password}
              helperText={errors.password?.message}

            />
            <Stack direction={"row"} spacing={2} > 
              <Button type='submit' variant='contained' fullWidth>
                Ingresar
              </Button>
              <Button variant='contained' fullWidth onClick={signInWithGoogle}>
                Con Google
              </Button>
            </Stack>
            
          </Stack>
        </form> 
        <Grid container justifyContent={'center'} marginTop={2}>
          <Link to={'/reset-password'}>¿Olvidaste tu contraseña?</Link>
          <Link to={'/sign-up'}> ¿No tienes cuenta? Regístrate <span style={{color:"#1ac8db"}}>aquí</span> </Link>             
        </Grid>
    </Grid>
  );
};

export default SignInForm;