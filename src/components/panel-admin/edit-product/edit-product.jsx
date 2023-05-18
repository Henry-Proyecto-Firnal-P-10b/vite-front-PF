import Swal from "sweetalert2";
//import react / redux
import {useState, useEffect} from 'react';
//import firebase
import {getProductByid, updateProduct } from '../../../utils/firebase/firebaseClient';
//import material ui
import { Grid, Typography, Stack, TextField, ImageList, Button, ImageListItem, MenuItem, Divider, Box } from '@mui/material';
import EditAttributesIcon from '@mui/icons-material/EditAttributes';
import SpellcheckOutlinedIcon from '@mui/icons-material/SpellcheckOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import Images from  "../../images/images"



const EditProduct = ({id}) => {

  
 const [product, setProduct] = useState();
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
    const product = await getProductByid(id)
    setProduct(product[0])
  } catch (error) {
    console.error(error);
  }
}

const handleDisabledChange = (field) => {
  setDisabled(prevState => ({
  ...prevState,
  [field]: !prevState[field]
  }));
 }

const handleChange =  (event) => {
  const property = event.target.name;
  const value = event.target.value;
  setProduct({
      ...product,
      [property] : value
  })
}
const handleSubmit = async (e) => {
  e.preventDefault();
  const data = product
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



return (
<div>     
<Grid
container
//justifyContent='center'
//alignItems={'start'}
//sx={{ minHeight: '100vh' }}
ml={8}
marginTop={3}
> 
<Grid justifyItems={"center"}>
  <Typography variant="h6" color="initial" align='center'>MODIFICAR PRODUCTO</Typography>
 
<Divider sx={{mt:2, mb:2}}/>
<Grid ml={8} width={"100%"}>
<form onSubmit={handleSubmit} noValidate>
 Nombre: 
 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '150%' }}>       
 <TextField 
      disabled={disabled.name}
      type='text'
      value={product?.name}
      onChange={handleChange}
      required
      name='name'
      margin='dense'
     fullWidth
     />
 <Button onClick={() =>  handleDisabledChange('name')}>
 <BorderColorOutlinedIcon/></Button>
 </Box>

 Descripcion:
 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '150%' }}>
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
    <Button onClick={() =>  handleDisabledChange('description')}
    sx={{ flexShrink: 0 }}>
      <BorderColorOutlinedIcon />
    </Button>
   </Box>
    Stock: 
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '150%' }}>    
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
      <BorderColorOutlinedIcon color="#283593"/></Button>
      </Box>
    Precio:
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '150%' }}>  
     <TextField
      disabled={disabled.price}
      type='number'
      value={product?.price}
      onChange={handleChange}
      required
      name='price'
      margin='dense'
      fullWidth
      
    /> 
    <Button onClick={() =>  handleDisabledChange('price')}>
    <BorderColorOutlinedIcon color="#283593"/></Button>
    </Box>
   Descuento:
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '150%' }}>  
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
    <BorderColorOutlinedIcon color="#283593"/></Button>
    </Box>
    
      {/* <TextField
      label='Select'
      select
      defaultValue=''
      name='category'
      onChange={handleSelect}
      
      > */}
          {/* {
            dataCategories?.categories?.map((ele, index)=> (
              <MenuItem key={index} value={ele.categories}>
                {ele.categories}
              </MenuItem>
          ))}
      </TextField>
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
      <Images setUrlImages={setUrlImages}/> */}
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '150%', mt:3 }}>  
    <Button type='submit' variant='contained' onClick={handleSubmit} fullWidth>Listo</Button>
    </Box>
    
      </form>
    </Grid>       
  </Grid>
</Grid>
</div>

 );
      

}

export default EditProduct