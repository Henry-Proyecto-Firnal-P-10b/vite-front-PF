//React
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "./features/userCredentials/userCredentialsSlice";
// Routes
import Home from "./routes/home/home";
import Shop from "./routes/shop/shop";
import Admin from "./routes/admin/admin";
import RequireAuth from "./components/require-auth/require-auth";
import LandingPage from "./routes/landing-page/landing-page";
import Authentication from "./routes/authentication/authentication";
//Firebase
import {
  createUserDocumentFromAuth,
  getCategories,
  getOrdersAdmin,
  getProducts,
  onAuthStateChangedListener,
} from "./utils/firebase/firebaseClient";
import Error from "./routes/404/404";
import DetailProduct from "./routes/detail/ProductDetail";
import {
  getProductsActions,
  productsCopy,
} from "./features/products/productSlice";
import { getCategoriesAction } from "./features/categories/categoriesSlice";
import SignUp from "./routes/authentication/signUp";
// import User from "./components/panel-admin/user/User";
import UserProfile from "./routes/userProfile/UserProfile";
import ResetPass from "./routes/reset-password/reset-password";
// import AboutUs from "./routes/AboutUs/AboutUs";
import { ordersAction } from "./features/orders/orders";
import Compras from "./components/compras/compras";

const App = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.persistedReducer.userData);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }

      dispatch(setCurrentUser(user));
    });
    getData();
    return unsubscribe;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    getProducts((a) => {
      const Products = [];
      a.forEach((element) => {
        const id = element.id;
        const data = element.data();
        Products.push({
          id,
          ...data,
        });
      });
      dispatch(getProductsActions(Products));
      dispatch(productsCopy(Products));
    });
    let category = await getCategories();
    dispatch(getCategoriesAction(category));
    getOrdersAdmin(a=>{
      const orders = [];
      a.forEach((element) => {
        const id = element.id;
        const data = element.data();
        orders.push({
          id,
          ...data,
        });
      });
      dispatch(ordersAction(orders))
      
    })
  };

  return (
    <Routes>
      <Route path="/" element={<LandingPage />}>
        <Route index element={<Home />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="detail/:id" element={<DetailProduct />} />
        <Route path="perfil" element={<UserProfile/>} />
        <Route path="compras" element={<Compras/>} />
        <Route path ="/reset-password" element={<ResetPass/>}/>
        {/* <Route path="about-us" element={<AboutUs/>} /> */}
      </Route>
      {userData?.admin && (
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <Admin />
            </RequireAuth>
          }
        />
      )}
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default App;
