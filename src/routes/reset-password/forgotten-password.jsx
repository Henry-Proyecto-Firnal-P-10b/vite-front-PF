import styles from './forgotten.module.css'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';

import emailjs from "emailjs-com"


const ForgottenPass = () => {

//EmailJs
const USER_ID= "service_82h1k7l";
const API_KEY= "template_4a9sgdp";
const TEMPLATE_ID= "oqauhqfeYX6gN7rRJ";

const [email, setEmail] = useState('');

const changeHandler = (event) => {
    setEmail(event.target.value)
}

var templateParams = {
    email: email,
  };

  console.log("templateParams: ", templateParams)


    const sendEmail = () =>{
        emailjs.send(USER_ID, API_KEY, templateParams, TEMPLATE_ID).then((result) => {
            if(result === 'OK'){
            console.log(result.text);
            Swal.fire({
                title: 'Correo enviado!',
                icon: 'success',
            })
            } if(error){
            console.log(error.text)
            Swal.fire({
                title: 'Error!',
                text: 'Ocurrió un error en el envío de correo.',
                icon: 'error',
            })
            }
        }) 
      };


    return(
    <div className={styles.fullContainer}>
        <h1>Recuperación de contraseña</h1>
        <form>
            <TextField sx={{
                width: '50%',
                marginTop: '5%',
                color: 'darkgray',
            }}
            label='Correo electrónico'
            type='email'
            autoComplete=""
            required                              
            value={email}
            onChange={changeHandler}
            name='email'
            />
        <Button variant='contained' sx={{
            fontSize: '15px',
            marginTop: '3%',
        }} onClick={sendEmail}>Enviar email de recuperación</Button>
        </form>

        </div>
)
}

export default ForgottenPass;