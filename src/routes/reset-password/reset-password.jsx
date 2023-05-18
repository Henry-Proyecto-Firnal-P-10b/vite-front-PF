import styles from './reset.module.css'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import React, { useState } from 'react';
import {resetPasswordEmail, updatePasswordInDatabase} from '../../utils/firebase/firebaseClient'
import 'firebase/auth';
import 'firebase/database';

    const ResetPass = () => {

    const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handlePasswordReset = async () => {
    try {
        console.log('email:', email)
      await resetPasswordEmail(email);
    console.log('mensaje enviado!')
            Swal.fire({
            title: 'Éxito!',
            text: 'Su contraseña ha sido actualizada.',
            icon: 'success',
        }) 
    } catch (error) {
      setError(error.message);
      console.log("error:", error)
        Swal.fire({
      title: 'Error!',
      text: 'Ingrese nuevamente su correo electónico.',
      icon: 'error',
  })
    }
  };


 return (
    <div>
        <div className={styles.fullContainer}>
      <h2>Recupera tu contraseña</h2>
            <TextField
            label='Correo electrónico'
            type='text'
            required                  
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete=""
            sx={{width:'40%', marginBottom: '1rem',
        marginTop: '3%'}}
            />
          <button onClick={handlePasswordReset}>Enviar correo de recuperación</button>
        </div>
      {/* {error && <p>{error}</p>} */}
    </div>
  );
 };

export default ResetPass