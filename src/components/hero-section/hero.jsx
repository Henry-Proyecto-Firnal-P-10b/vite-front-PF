import styles from './hero.module.css';

//import react y redux
import React from 'react';
import { useEffect, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Button, Typography, Box, Grid  } from '@mui/material';
import { styled } from '@mui/material/styles'
import bebe1 from '../../../documents/Image/bebe1.jpg'
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { Link } from 'react-router-dom';
//import componentes
import Slider from "./slider/slider"
import CardInf from "../card/card"
//import Firebase
import { getProducts } from '../../utils/firebase/firebaseClient';
//import Redux
import { getProductsActions } from '../../features/products/productSlice'


const HeroContainer = styled(Paper)(({ theme }) => ({
  backgroundImage: `url(${bebe1})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  width: '100vw',  
  padding: theme.spacing(6),
 
  //padding: theme.spacing(4),    
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(6),
    //padding: theme.spacing(4),
    minHeight: "100vh",
  },
}));

const HeroTitle = styled('h1')(({ theme }) => ({
  //color: 'white',
  color: 'black',
  marginTop: "1px",
  marginRight:"1px",
 // marginBottom: theme.spacing(2),
  fontSize: theme.typography.pxToRem(20),
  textAlign: 'center',
  fontWeight: 'bold',  
  maxWidth: '700px',
  [theme.breakpoints.up('sm')]: {
    fontSize: theme.typography.pxToRem(70),
    marginTop: theme.spacing(2),
  },
}));

const HeroSubtitle = styled('h2')(({ theme }) => ({
  //color: 'white',
  color: 'black',
  //marginTop: theme.spacing(4),
  textAlign: 'center',
  fontSize: theme.typography.pxToRem(14),
  fontWeight: 'normal',
  maxWidth: '700px',
  [theme.breakpoints.up('sm')]: {
    fontSize: theme.typography.pxToRem(20),
    //marginTop: theme.spacing(8),
  },
}));

const HeroButton = styled(Button)(({ theme }) => ({
backdropFilter: 'blur(10px)',
color: '#ffffff',
float: 'right',
marginTop: '20px',
marginRight: theme.spacing(12),
padding: theme.spacing(1),
fontSize: theme.typography.pxToRem(20),
borderColor: 'red',
borderWidth: 'thick',
borderRadius: '20px',
[theme.breakpoints.up('sm')]: {
  fontSize: theme.typography.pxToRem(24),
  marginRight: theme.spacing(40),
marginTop: '-160px',
  },
}));

export default function Hero() {

  const { products } = useSelector(state => state.products);
  const updateRef = useRef(0);


  useEffect(() => {
    if(updateRef.current === 0){
     
      const fetchData = async () => {
        // const result = await getProducts()
        // dispatch(getProductsActions(result))
        }
        fetchData()  
        updateRef.current += 1; 
    }    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
 
  //filtros orden por rating (imperdibles) y discount(recomendados)
  const sortedProductsByRating=[...products].sort((a,b)=>b.rating - a.rating).slice(0,4)
  const sortedProductsBySale=[...products].sort((a,b)=>b.sale.discount - a.sale.discount).slice(1,5)
 

  return (
    <>
    <HeroContainer elevation={8}>
    <Box sx={{width:"100%", pb:1, borderRadius:5}}>
     <HeroTitle >Mom Home & Baby</HeroTitle>     
      <HeroSubtitle>
        Asesoramos a mamitas primerizas en la elección de los mejores productos para su embarazo, lactancia y sus bebés. <br />
        ¡Ahorrándoles horas de investigación!
      </HeroSubtitle>
      <Button  sx={{
        justifyContent:"center",
        ml:{xs:5, sm:15, md:0, lg:0, xl:0},
        mt:{sm:"2%"},
        width:{xs:"80%", sm:"60%"},
       // background:"#0d47a1",
       background:"#1976d2",
      '&:hover':{
        background:"#424242",          
      }}} 
        className={styles["vibrate-1"]}
        startIcon={<LocalMallIcon sx={{color:"white", mr:"12", }}/>}
      >
      <Link to={"/shop"}>
      <Typography variant="body1" color="secondary"sx={{fontSize:"14px" } }>  Ir a la Tienda</Typography>
        </Link>
      </Button>
      </Box>      
    </HeroContainer>
    <Box elevetion={8} alignContent={"center"} justifyContent={"center"} textAlign={"center"}
    
    sx={{width:{xs:"80%"}}}>
    <Typography textAlign={"center"} ml={18} mt={3} variant='h5'sx={{fontSize:"8"}}>
        PRODUCTOS IMPERDIBLES
    </Typography> 
    <Grid container justifyContent={"center"} ml={{xs:5, sm:10}} > 
    {
    sortedProductsByRating.length?sortedProductsByRating.map((sortedProductsByRating, i) => (
    <CardInf
     key={`${sortedProductsByRating.id}+${i}`}
     id = {sortedProductsByRating.id}
     imageUrl={sortedProductsByRating.imageUrl[0]}
     title={sortedProductsByRating.name}
     price={sortedProductsByRating.price}
     sale={sortedProductsByRating.sale}
     rating={sortedProductsByRating.rating}    
    />
    )):(null) 
    } 
    </Grid>   
    <Paper> 
    <Slider/>    
    </Paper>
    <Typography textAlign={"center"} mt={3} ml={18} variant='h5'>
        NUESTROS RECOMENDADOS
    </Typography> 
    <Grid container justifyContent={"center"} ml={{xs:5, sm:10}} > 
     
    {
    sortedProductsBySale.length?sortedProductsBySale.map((sortedProductsBySale, i) => (
    <CardInf
     key={`${sortedProductsBySale.id}+${i}`}
     id = {sortedProductsBySale.id}
     imageUrl={sortedProductsBySale.imageUrl[0]}
     title={sortedProductsBySale.name}
     price={sortedProductsBySale.price}
     sale={sortedProductsBySale.sale}
     rating={sortedProductsBySale.rating}    
    />
    )):(null) 
    } 
    </Grid>
    </Box>

    </>
  );
}