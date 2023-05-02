//React
import { useEffect } from "react";
import { Routes, Route,  } from "react-router-dom";
//Redux
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./features/userCredentials/userCredentialsSlice";
// Routes
import Home from "./routes/home/home";
import Shop from "./routes/shop/shop";
import Admin from "./routes/admin/admin";
import RequireAuth from "./components/require-auth/require-auth";
import LandingPage from "./routes/landing-page/landing-page";
import Authentication from "./routes/authentication/authentication";
//Firebase
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "./utils/firebase/firebaseClient";
import Error from "./routes/404/404";
import DetailProduct from "./routes/detail/ProductDetail";


const App = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    const unsubscribe = onAuthStateChangedListener((user)=> {
      if(user){
        createUserDocumentFromAuth(user);
      }      
      dispatch(setCurrentUser(user))
    })

    return unsubscribe;
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <Routes>    
      <Route path="/" element={<LandingPage/>}>
        <Route index element={<Home />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="shop" element={<Shop />} />
        <Route path="detail/:id" element={<DetailProduct/>}/>        
      </Route>
      <Route path="/admin" element={
          <RequireAuth>
            <Admin/>
          </RequireAuth>
        }/>
      <Route path="*" element={<Error />} />
    </Routes>
      
    
  )
}

export default App;