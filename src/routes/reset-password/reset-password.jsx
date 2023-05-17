import styles from './reset.module.css'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import React, { useState } from 'react';

const ResetPass = ()=>{
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [passMatch, setPassMatch] = useState(true);

    const handleNewPass = (event) =>{
        setNewPass(event.target.value);
    }

    const handleConfirmPass = (event) => {
        setConfirmPass(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    if(newPass === confirmPass) {
        console.log('contraseña actualizada');
        Swal.fire({
            title: 'Éxito!',
            text: 'Su contraseña ha sido actualizada.',
            icon: 'success',
        })        
        setNewPass('');
        setConfirmPass('');
        setPassMatch(true);
    } else{
        console.log('las contraseñas no coinciden');
        Swal.fire({
            title: 'Error!',
            text: 'Las contraseñas no coinciden.',
            icon: 'error',
        })    
        setPassMatch(false);
    }}

    return(
        <div>
            <h1>Cambio de contraseña</h1>
        <form>
            <TextField
            label='Nueva contraseña'
            type='password'
            required                  
            value={newPass}
            onChange={handleNewPass}
            autoComplete=""
            sx={{width:'40%', marginBottom: '1rem'}}
            />
            <TextField
            label='Confirmar contraseña'
            type='password'
            required               
            value={confirmPass}
            onChange={handleConfirmPass}
            autoComplete=""
            sx={{width:'40%', marginBottom: '1rem'}}
            />
        {/* </Stack> */}
        <Button variant='contained' sx={{
            fontSize: '15px',
            marginTop: '2%',
        }} onClick={handleSubmit}>Cambiar contraseña</Button>
            </form>
        </div>
    )
}

export default ResetPass