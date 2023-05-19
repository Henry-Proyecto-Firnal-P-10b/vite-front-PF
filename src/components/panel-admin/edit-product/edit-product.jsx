import Swal from "sweetalert2";

import styles from "../edit-product/edit-product.module.css";
//import react / redux
import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";

//import firebase
import {getProductByid, updateProduct,getCategories } from '../../../utils/firebase/firebaseClient';
import { getCategoriesAction } from  "../../../features/categories/categoriesSlice" 

//import material ui
import { Grid, Typography, Stack, TextField, ImageList, Button, ImageListItem, FormHelperText, Box, Container} from '@mui/material';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import Images from  "../../images/images"



const EditProduct = ({id}) => {

 const [urlImages, setUrlImages] = useState([]);
  const dispatch = useDispatch()

 const dataCategories = useSelector(state => state.categories)  
 const [errors, setErrors] = useState({ name: false, price: false });
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

 const [disabled, setDisabled] = useState({
  name: true,
  description: true,
  stock: true,
  price: true,
  discount: true,
  categories: true,
  imageUrl: true
 });

useEffect(() => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  getProduct(id);
}, [id])

const getProduct = async (id) => {
  try {
    await getProductByid(id,dat =>{        
      setProduct(dat.data())
      
    })     
  } catch (error) {
    console.error(error);
  }
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
    setProduct((product) => ({
      ...product,
      categories: [...product.categories, selectedCategory],
    }));

  }
}
const handleRemoveCategory = (categoryToRemove) => {
  setProduct((product) => ({
    ...product,
    categories: product.categories.filter(
      (category) => category !== categoryToRemove
    ),
  }));
  console.log("categoryRemoved: "+ product.categories)
};

const handleRemoveImage = (imageUrlToRemove) => {
  setProduct((product) => ({
    ...product,
    imageUrl: product.imageUrl.filter(
      (imageUrl) => imageUrl !== imageUrlToRemove
    ),
  }));
};

const handleDisabledChange = (field) => {
  setDisabled(prevState => ({
  ...prevState,
  [field]: !prevState[field]
  }));
 }

 const handleChange = (event) => {
  const property = event.target.name;
  const value = event.target.value;
  //manejo de errores
  if ((property === 'name' || property === 'price') && value) {
    setErrors((prevErrors) => ({ ...prevErrors, [property]: false }));
  }
  //si discount es = 0 q borre el array disconunt de sale{}
  if (property === 'discount') {
  if (value === "0") {
  setProduct(prevProduct => {
  const newSale = { ...prevProduct.sale };
  delete newSale.discount;
  return {
  ...prevProduct,
  sale: newSale
  };
  });
  } else {
  setProduct(prevProduct => ({
  ...prevProduct,
  sale: {
  ...prevProduct.sale,
  discount: value
  }
  }));
  }
  } else {
  setProduct(prevProduct => ({
  ...prevProduct,
  [property]: value
  }));
  }
 }
 
const handleSubmit = async (e) => {
  e.preventDefault();
  //manejo de errores
  if (!product.name || !product.price) {
    setErrors({
      name: !product.name,
      price: !product.price,
    });
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Parece que el nombre y/o el precio del producto estan vacios!',      
    })
    
    return;
  }
  
  const data ={ ...product,
    id:id}
  
  
  try{
      await updateProduct(data)
      Swal.fire({
        icon: 'success',
        title: 'Listo!',
        text: 'El Producto ha sido modificado correctamente',
        
      })
    
  } catch(error){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Ocurrio un error... intentalo nuevamente',
      
    })
  }
  }

  
   
  useEffect(()=>{
    if(urlImages.length < 1) return;
    setProduct({
      ...product,
      imageUrl: [...product.imageUrl, urlImages]
    })
  }, [urlImages])



return (
<div>      
<Container maxWidth="ml" minWidth="xs" sx={{mt:"2rem", mx: "1rem"}}>
<form onSubmit={handleSubmit} className={styles.center} noValidate>
<h1 className={styles.title}>MODIFICAR PRODUCTO</h1>
<div className={styles.contenedor}>
 Nombre: 
 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>      
 <TextField 
      disabled={disabled.name}
      type='text'
      value={product?.name}
      onChange={handleChange}
      required
      name='name'
      margin='dense'
     fullWidth
     error={errors.name}
     />
 <Button onClick={() =>  handleDisabledChange('name')}>
 <BorderColorOutlinedIcon sx={{ color: !disabled.name ? 'primary.main' : "#989898" }}/></Button>
 </Box>
 {errors.name && <FormHelperText sx={{fontSize:"14px"}}error>* El nombre es obligatorio</FormHelperText>}


 Descripcion:
 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
    <TextField
      disabled={disabled.description}
      type='text'
      value={product?.description}
      onChange={handleChange}
      required
      name='description'
      margin='dense'
      fullWidth
      inputProps={{
        style: {height: 60},
      }}
      multiline
      rows={3}
     
    />  
    <Button onClick={() =>  handleDisabledChange('description')}>
      <BorderColorOutlinedIcon sx={{ color: !disabled.description ? 'primary.main' : "#989898" }}/>
    </Button>
   </Box>
    Stock: 
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>  
    <TextField
      disabled={disabled.stock}
      type='number'
      value={product?.stock}
      onChange={handleChange}
      required
      name='stock'
      margin='dense'      
     fullWidth
      
    />  
      <Button onClick={() =>  handleDisabledChange('stock')} >
      <BorderColorOutlinedIcon sx={{ color: !disabled.stock ? 'primary.main' : "#989898" }}/></Button>
      </Box>
    Precio:
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
     <TextField
      disabled={disabled.price}
      type='number'
      value={product?.price}
      onChange={handleChange}
      required
      name='price'
      margin='dense'
      error={errors.price}
      fullWidth
      
    /> 
    <Button onClick={() =>  handleDisabledChange('price')}>
    <BorderColorOutlinedIcon sx={{ color: !disabled.price ? 'primary.main' : "#989898" }}/></Button>
    </Box>
    {errors.price && <FormHelperText sx={{fontSize:"14px"}}error>* El Precio es obligatorio</FormHelperText>}
   Descuento:
   <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
     <TextField
      disabled={disabled.discount}
      type='number'
      value={product?.sale.discount} 
      onChange={handleChange}
      required
      name='discount'
      margin='dense'
      fullWidth
      
    /> 
    <Button onClick={() =>  handleDisabledChange('discount')}>
    <BorderColorOutlinedIcon sx={{ color: !disabled.discount ? 'primary.main' : "#989898" }}/></Button>
    </Box>
  
   
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
    <select  disabled={disabled.categories} name="category" onChange={handleSelect} className={styles.select} >
    {dataCategories?.categories?.map((ele, index) => (
    <option key={index} value={ele.categories}>
    {ele.categories}
    </option>
    ))}    
   </select>
   <Button onClick={() =>  handleDisabledChange('categories')}>
    <BorderColorOutlinedIcon sx={{ color: !disabled.categories ? 'primary.main' : "#989898" }}/></Button>
   </Box>
   <Box component="label" className={`${styles.categories} ${styles.responsiveBox}`} sx={{ display: 'inline-block'}} >
  Categorías:{" "}
  {product.categories?.map((category, index) => (
    <span key={index}>{" | "}{category}
      <button type="button" onClick={() => handleRemoveCategory(category)} className={styles.buton}>x</button>
    </span>
  ))}
</Box>

   {/* //imagenes */}
   
      {product.imageUrl.length > 0 ? <ImageList sx={{ minHeight: '25vh'}} cols={3} rowHeight={164}>
          {
            product.imageUrl?.map((item, i)=>(
              <ImageListItem key={i}>
                <img
                src={`${item}?w=100&h=100&fit=crop&auto=format`}
                />
                 <button type="button"onClick={() => handleRemoveImage(item)} className={styles.butonImagen}
                 >x</button>
              </ImageListItem>
            ))
          }
      </ImageList> : null }
      <Images setUrlImages={setUrlImages}/>       
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>  
    <Button type='submit' variant='contained' onClick={handleSubmit} fullWidth>Listo</Button>
    </Box>
    </div>
      </form>
      </Container>
</div>
 );      

}

export default EditProduct