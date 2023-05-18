//Redux 
import { configureStore } from '@reduxjs/toolkit'
//persist
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import { combineReducers } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
//Redux Slice
import cartSlice from '../features/cartSlice/cartSlice'
import productSlice  from '../features/products/productSlice'
import favoriteSlice from '../features/favorite/favoriteSlice'
import userDataSlice from '../features/userData/userDataSlice'
import productsIdSlice from '../features/productsId/productsIdSlice'
import categoriesSlice from '../features/categories/categoriesSlice'
import credentialsReducer from '../features/userCredentials/userCredentialsSlice'
import productPag from '../features/productsPagination/productsPaginationSlice'
import cartReducer from '../features/cartSlice/cartSlice'
import orderSlice from '../features/orders/orders'


const persistConfig = {
  key : 'localCar',
  storage,
  whitelist: ['carState', 'userData']
}
const localCarReducer = combineReducers({
  carState : cartSlice,
  userData: userDataSlice
})
const persistedReducer = persistReducer(
 persistConfig, localCarReducer
)


export const store = configureStore({
  reducer: {
    currentUser : credentialsReducer,
    // userData : userDataSlice,
    products: productSlice,
    productsId: productsIdSlice,
 //   carrito: carritoSlice,
    persistedReducer,
    orders : orderSlice,
    favorite: favoriteSlice,
    categories: categoriesSlice,
    productPag : productPag,
    cart: cartReducer  
  },
  middleware :[thunk]
})