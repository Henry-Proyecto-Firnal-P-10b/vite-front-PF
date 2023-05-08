import { Routes, Route } from 'react-router-dom'

import Products from '../../components/products/products'
import Cart from '../cart/cart'
import Checkout from '../checkout/checkout'

const Shop = () => {
   return (
    <Routes>
      <Route index element={<Products />} />
      <Route path='cart' element = {<Cart />} />
      <Route path='checkout' element = {<Checkout />} />
    </Routes>
  )
}

export default Shop

