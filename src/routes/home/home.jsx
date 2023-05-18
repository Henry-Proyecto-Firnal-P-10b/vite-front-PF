import HeroComponent from "../../components/hero-components/hero-component/hero-component"
import HomeCarousel from "../../components/hero-components/home-carousel/home-carousel";
import ProductsByRaiting from "../../components/hero-components/products-by-raiting/products-by-raiting";
import ProductsBySale from "../../components/hero-components/products-by-sale/products-by-sale";
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getUserByid } from "../../utils/firebase/firebaseClient"
import { getUserData } from "../../features/userData/userDataSlice"

const Home = () => {
  const uid  = useSelector(state=> state.currentUser.userCredentials?.uid)
  const dispatch = useDispatch()

  useEffect(()=>{
      if(uid){
        const dataUser = async() =>{
       
      getUserByid(uid,dat =>{
          dispatch(getUserData(dat.data()))
        })          
          }
          dataUser()
      }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

return (        
  <>
      <HeroComponent />
      <ProductsByRaiting />
      <HomeCarousel />
      <br />
      <ProductsBySale />           
  </>     
  )
}

export default Home;