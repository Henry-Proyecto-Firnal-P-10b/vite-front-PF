import style from "./contactForm.module.css"
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import {useState} from 'react'
import emailjs from '@emailjs/browser';
import Swal from "sweetalert2";

const ContactForm = () => {

    //EmailJs
    const service = 'service_82h1k7l';
    const template = 'template_lgs2fiu';
    const apiKey = 'oqauhqfeYX6gN7rRJ';


    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [issue, setIssue] = useState('')
    const [message, setMessage] = useState('')

    const sendEmail = (event) => {
        event.preventDefault()
        const params = {
            email: email,
            name: name,
            issue: issue,
            message: message
        }
        emailjs.sendForm(service, template, event.target, apiKey).then(
            (result)=> {
            if(result.text === 'OK'){
                Swal.fire({
                        title: 'Correo enviado!',
                        text: 'Pronto responderemos tu mensaje.',
                        icon: 'success',
                    })
                } else {
                    console.log(result.text)
                    Swal.fire({
                        title: 'Error!',
                        text: 'Intentalo de nuevo.',
                        icon: 'error',
                    })
                }
            }
        )
    }

    return(
        <div>
        <h2>Contáctate con nosotros</h2>
        <br/>
        <div className={style.fullContainer}>
        <form onSubmit={sendEmail}>
      <Stack spacing={2}  >
        <TextField
          label="Email"
          type="email"
          autoComplete=""
          required
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Nombre"
          type="text"
          autoComplete=""
          required
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Asunto"
          type="text"
          autoComplete=""
          required
          name="issue"
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
        />
        <TextField
          label="Consulta, sugerencia o comentario"
          type="text"
          autoComplete=""
          required
          size="large"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={style.consulta}
          sx = {{
            marginBottom: '60%'
          }}
        />
          <button type="submit" className={style.btn}>Enviar</button>
      </Stack>
      </form>
      </div>
        </div>
    )
}

export default ContactForm;