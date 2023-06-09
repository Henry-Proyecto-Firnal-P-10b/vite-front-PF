import Swal from 'sweetalert2';
//Material UI 
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
//EmailJS
import emailjs from "emailjs-com"
const USER_ID="service_8duinll"
const API_KEY="lp4j5eTKXZNYsZ4jM"
const TEMPLATE_ID="template_cvqj07q"
//Firebase 
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebaseClient';
import { Stack } from '@mui/material';
//Form 
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



const SignUpForm = () => {

  const form = useForm({
    defaultValues:{
      email:"",
      password:"",
      repeatPassword:"",
      displayName:""
    }
  });

  const { register, handleSubmit, formState: {errors} } = form;
  const navigate = useNavigate()
  const onSubmitRegistration = async ({displayName, email, password, repeatPassword})=> {
    if (password !== repeatPassword) {
           Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Las contraseñas no coinciden',
      
    });
          return;
        }
        try {
          const { user } = await createAuthUserWithEmailAndPassword(
            email,
            password
          );
          await createUserDocumentFromAuth(user, { displayName }); 
          Swal.fire({
        icon: 'success',
        title: 'Ok!',
        text: 'Registrado Exitosamente',
        
      })
          
          navigate('/auth')
        } catch (error) {
          if (error.code === 'auth/email-already-in-use') {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'El correo electrónico ya está registrado en el sistema',
            })
           // alert('');
          } else {
            console.error('Ha ocurrido un error al intentar crear el usuario', error);
          }
        }

        //envio mail de Registro
        emailjs.send(USER_ID, TEMPLATE_ID, {
          email: email,
          displayName: displayName
        }, API_KEY)
  }

  return (
    <Grid item md={8} xs={10}>
      <Typography variant="h4" color="initial" align='center'>¿No estás registrado?</Typography>
      <Typography variant="body1" align='center' marginBottom={4}>Crea una cuenta con tu correo electrónico y contraseña</Typography>

      <form onSubmit={handleSubmit(onSubmitRegistration)} noValidate>
        <Stack spacing={2}>
          <TextField
            label='Nombre'
            type='text'
            required                   
            {...register('displayName', { required:"Por favor, ingrese un nombre de usuario"})}
            error={!!errors.displayName}
            helperText={errors.displayName?.message}
            autoComplete=""
          />

          <TextField
            label='Correo electrónico'
            type='email'
            required            
            {...register('email', { required:"El correo electrónico es obligatorio"})}
            error={!!errors.email}
            helperText={errors.email?.message}        
            autoComplete=""
          />

          <TextField
            label='Contraseña'
            type='password'
            required            
            {...register('password', { required:"La contraseña es obligatoria"})}
            error={!!errors.password}
            helperText={errors.password?.message}             
            autoComplete=""
          />

          <TextField
            label='Confirmar contraseña'
            type='password'
            required
            {...register('repeatPassword', { required:"La confirmación de contraseña es obligatoria"})}
            error={!!errors.repeatPassword}
            helperText={errors.repeatPassword?.message}
            autoComplete=""
          />
          <Button type='submit' variant='contained'>Registrarse</Button>
        </Stack>
      </form>
      <Grid container justifyContent={'center'} marginTop={2}>
        <Link to={'/auth'}> ¿Ya estas registrado? Ingresar <span style={{color:"#1ac8db"}}>aquí</span></Link>
      </Grid>
    </Grid>
  );
};

export default SignUpForm;