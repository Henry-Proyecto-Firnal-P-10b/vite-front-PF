import React from 'react'
import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const Slider = () => {
const textBanner =["LA MATERNIDAD ES UN CAMINO QUE TE ENSEÑA A SER PERSEVERANTE, POSITIVA, RECURSIVA Y MAGICA","CLARO QUE HAY DIAS O ETAPAS DIFICILES Y ESO TAMBIEN ES NORMAL", "DIOS TE ELIGIÓ PARA SER MADRE EN EL MOMENTO JUSTO", "Y TE DOTO DE TODO LO QUE NECESITAS PARA SER LA MAMÁ PERFECTA PARA TU BEBE"];

const [index, setIndex] = useState(0);
useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % textBanner.length);     
    }, 5000);
    return () => clearInterval(interval);
 }, []);


return (
  <>
  <Box   
   sx={{
   width: "100vw",
   height:{ xs:130, sm:110,},
   justifyContent:"center",
   alignItems:"center",
   pt:"1.5%",
   //**CAMBIE COLOR BACKGROUND BANNER */
   //background: "#0d47a1",
   background:"#1e88e5",
  
  }}
  >
  <Typography color={"secondary"}  variant='h6' sx={{pt:{xs:"1%"}}} >
  {textBanner[index]} </Typography> 
  <FavoriteBorderIcon color={"secondary"}/>
  </Box> 
  </>
  )
}

export default Slider;
