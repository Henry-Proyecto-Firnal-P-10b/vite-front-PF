import { Container, ImageList, ImageListItem, MenuItem, TextField  } from '@mui/material';
import {useState, useEffect} from 'react';
import { postProductsAdmin, getCategories } from '../../../utils/firebase/firebaseClient';
import { getCategoriesAction } from  "../../../features/categories/categoriesSlice" 
import Images from  "../../images/images"
import { useForm } from 'react-hook-form';
import styles from "../create-product/create-product.module.css";
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Swal from "sweetalert2";

const CreateProduct = () => {
  
  const [urlImages, setUrlImages] = useState([]);
  const dispatch = useDispatch()

  const dataCategories = useSelector(state => state.categories)

  const [product, setProduct] = useState({
    name: '',
    description: '',
    stock: 0,
    price: 0,
    categories: [],
    imageUrl: [],
    reviews: [],
    rating: 0,
    sale: {},
    active: true
  });

  
  const productform = useForm({
      defaultValue:{
        name: '',
        description: '',
        stock: 0,
        price: 0,
        categories: [],
        imageUrl: [],
      }
    })
    
  const {register, handleSubmit, formState:{ errors }} = productform;
 
  const handleChange =  (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setProduct({
        ...product,
        [property] : value
    })
}

 useEffect(() => {
  const getCat = async() => {
    const result = await getCategories()
    dispatch(getCategoriesAction(result))
  };
  getCat()
}, [])

const handleSelect =(event) => {
  const selectedCategory = event.target.value;
  if (!product.categories.includes(selectedCategory)) {
    setProduct((prevProduct) => ({
      ...prevProduct,
      categories: [...prevProduct.categories, selectedCategory],
    }));
  }
}
const handleRemoveCategory = (categoryToRemove) => {

  setProduct((prevProduct) => ({
    ...prevProduct,
    categories: prevProduct.categories.filter(
      (category) => category !== categoryToRemove
    ),
  }));
};
 
useEffect(()=>{
  if(urlImages.length < 1) return;
  setProduct({
    ...product,
    imageUrl: [...product.imageUrl, urlImages]
  })
}, [urlImages])

const onSubmit = async (e) => {
  //e.preventDefault();
  const data = {...product,
          ...e}
 
 
  try{
    await postProductsAdmin(data)
    Swal.fire({
    icon: 'success',
    title: 'Listo!',
    text: 'Creaste el Producto Correctamente :)',
    })
    //para limpiar el formulario despues de crear el producto
    productform.reset();
} catch(error){
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Ocurrio un error... intentalo nuevamente :(',
    
  })
  }
}


  return (
    <div>      
      <Container maxWidth="lg" sx={{mt:"2rem"}}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.center} noValidate>
        <h1 className={styles.title}>AGREGAR PRODUCTO</h1>
          <div className={styles.contenedor}>
            <TextField
            label='Nombre'
            type='text'
            onChange={handleChange}
            required
            name='name'
            margin='dense'
            {...register("name", {required: 'Ingrese el nombre del producto'})}
            error={!!errors.name}
            helperText={errors.name?.message}
          />   
            <TextField
            label='Descripcion'
            type='text'
            onChange={handleChange}
            required
            name='description'
            margin='dense'
            inputProps={{
              style: {height: 60},
            }}
            multiline
            rows={3}
            {...register("description", {required: 'Ingrese la descripción del producto'})}
            error={!!errors.description}
            helperText={errors.description?.message}
          />   
            <TextField
            label='Stock'
            type='number'
            onChange={handleChange}
            required
            name='stock'
            margin='dense'
            {...register("stock", {required: 'Ingrese la cantidad de producto disponible', min:1})}
            error={!!errors.stock}
            helperText={errors.stock?.message}
          />   
            <TextField
            label='Precio'
            type='number'
            onChange={handleChange}
            required
            name='price'
            margin='dense'
            {...register("price", {required:'ingrese el precio de venta del producto', min:0})}
            error={!!errors.price}
            helperText={errors.price?.message}
          /> 
          
           <select name="category" onChange={handleSelect} className={styles.select}>
           {dataCategories?.categories?.map((ele, index) => (
            <option key={index} value={ele.categories}>
           {ele.categories}
           </option>
           ))}
          </select>
          {/*mostrar y eliminar categorias seleccionadas */}
          <label className={styles.categories}>
          Categorías:{" "}
          {product.categories?.map((category, index) => (
           <span key={index}>{" | "}{category}
           <button type="button"onClick={() => handleRemoveCategory(category)} className={styles.buton}>x</button>
           </span>
           ))}
          </label>

          {/* imagenes */}
            {product.imageUrl.length > 0 ? <ImageList sx={{ minHeight: '25vh'}} cols={3} rowHeight={164}>
                {
                  product.imageUrl?.map((item, i)=>(
                    <ImageListItem key={i}>
                      <img
                      src={`${item}?w=100&h=100&fit=crop&auto=format`}
                      />
                    </ImageListItem>
                  ))
                }
            </ImageList> : null }
            <Images setUrlImages={setUrlImages}/>
            <Button type='submit' variant='contained' onClick={()=>handleSubmit} fullWidth>Listo</Button>
            </div>            
            </form>
         
                
        </Container>
      </div>
  );
      

}

export default CreateProduct
