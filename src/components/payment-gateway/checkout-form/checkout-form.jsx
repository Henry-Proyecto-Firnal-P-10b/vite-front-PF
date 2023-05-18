import TextField from '@mui/material/TextField'
import { useForm } from "react-hook-form"
// import PaymentForm from '../payment-form/payment-form'
import Stack from '@mui/material/Stack'
import styles from "./checkout-form.module.css"
import { useDispatch } from 'react-redux'
import { setOrderInf } from '../../../features/userData/userDataSlice'
import { useNavigate } from 'react-router-dom'

const CheckoutForm = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const checkoutform = useForm({
    defaultValues: {
      name: "",
      lastName: "",
      company: "",
      country: "",
      streetA: "",    
      ZIPcode: "",
      phone: "",
      email: "",
      orderNotes: ""
    }
  })

  const { register, handleSubmit, formState: { errors } } = checkoutform;

  const onSubmit = (e) => {
    dispatch(setOrderInf(e))
    navigate("/shop/payment");
  }

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value) || "Correo electrónico inválido";
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={2}>
        <TextField
          label="Nombre"
          type="text"
          autoComplete=""
          required
          {...register("name", { required: "Ingrese el nombre del destinatario", maxLength: 20, minLength:3 })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          label="Apellido"
          type="text"
          autoComplete=""
          required
          {...register("lastName", { required: "Ingrese el apellido del destinatario", maxLength: 25, minLength:3  })}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
        />
        <TextField
          label="Nombre de la Empresa"
          type="text"
          autoComplete=""
          {...register("company")}
          error={!!errors.company}
          helperText={errors.company?.message}
        />
        <TextField
          label="Cuidad"
          type="text"
          autoComplete=""
          required
          {...register("country", { required: "Ingrese la cuidad del destinatario" })}
          error={!!errors.country}
          helperText={errors.country?.message}
        />
        <TextField
          label="Calle"
          type="text"
          autoComplete=""
          required
          {...register("streetA", { required: "Ingrese la calle del destinatario", maxLength: 20, minLength:3 })}
          error={!!errors.streetA}
          helperText={errors.streetA?.message}
        />
        <TextField
          label="Codigo postal "
          type="text"
          autoComplete=""
          required
          {...register("ZIPcode", { required: "Ingrese el codigo postal del destinatario", maxLength: 10, minLength: 4 })}
          error={!!errors.ZIPcode}
          helperText={errors.ZIPcode?.message}
        />
        <TextField
          label="Numero de telefono "
          type="text"
          autoComplete=""
          required
          {...register("phone", { required: "Ingrese el numero de celular del destinatario", maxLength:15, minLength:6 })}
          error={!!errors.phone}
          helperText={errors.phone?.message}
        />
        <TextField
          label="Email"
          type="email"
          autoComplete=""
          {...register("email", {required: true, validate: validateEmail})}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Informacion adicional"
          type="text"
          autoComplete=""
          {...register("orderNotes", { maxLength: 200})}
          error={!!errors.orderNotes}
          helperText={errors.orderNotes?.message}
        />
        <div>
        </div>
        <div className={styles.btnContainer}>
          <button type="submit" className={styles.btn}>Enviar</button>
        </div>
      </Stack>
    </form>
   
  )
}

export default CheckoutForm
