import styles from './navigation.module.css';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
//redux
import { useSelector } from 'react-redux';
//svg's
import searchBtn from "../../utils/svg/search-outline.svg";
import closeBtn from "../../utils/svg/close-outline.svg";
import menuBtn from "../../utils/svg/menu-outline.svg";
//components
import CartIcon from '../payment-gateway/cart-icon/cart-icon';
import LinksNavbar from './links-navbar/links-navbar';
import { useDispatch } from 'react-redux';
import { setPagesActions } from '../../features/productsPagination/productsPaginationSlice';
import { searchProduct } from './search';
import { getProductsActions, prodNameCopy, productsName } from '../../features/products/productSlice';


const Navigation = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [isToggleOn, setIsToggleOn] = useState(false);

  const { products, productsCopy, productsFilter, productsFilterCopy } = useSelector(state => state.products)
  const {userData}  = useSelector((state) => state.persistedReducer.userData);

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  const handleClickSearchBtn = () => {
    setIsOpen(true);
    setIsToggleOn(false);
    if (isOpen) {
      setIsOpen(false);
    }
  }

  const handleClickCloseBtn = () => {
    setIsOpen(false);
  }

  const handleClickHeader = () => {
    setIsToggleOn(!isToggleOn);
    setIsOpen(false);
  }

  const handleClick = () => {
    setIsToggleOn(false);
    dispatch(getProductsActions(productsCopy))
    dispatch(productsName([]))
    dispatch(setPagesActions(Math.ceil(productsCopy.length / 8)))
  }

  const handleClickCart = () => {
    setIsToggleOn(!isToggleOn);
    navigate("/shop/cart");
  }

  const handleChange = async (value) => {

    if (location.pathname !== "/shop") navigate("/shop")

    const name = value.target.value.trim()
    if (name) {
      const searchProducts = await searchProduct(name, productsCopy)
      dispatch(prodNameCopy(searchProducts))
      if (productsFilter.length) {
        const searchProducts = await searchProduct(name, productsFilterCopy)
        dispatch(getProductsActions(searchProducts))
        dispatch(productsName(searchProducts))
        dispatch(setPagesActions(Math.ceil(searchProducts.length / 8)))

      }
      else {
        const searchProducts = await searchProduct(name, productsCopy)
        dispatch(getProductsActions(searchProducts))
        dispatch(productsName(searchProducts))
        dispatch(setPagesActions(Math.ceil(searchProducts.length / 8)))
      }

    } else {

      if (productsFilter.length) {
        dispatch(setPagesActions(Math.ceil(products.length / 8)))
        dispatch(getProductsActions(productsFilterCopy))
        dispatch(productsName([]));
      }
      else {

        dispatch(setPagesActions(Math.ceil(products.length / 8)))
        dispatch(getProductsActions(productsCopy));
        dispatch(productsName([]));
      }

    }
  }
  return (
    <>
      <header className={`${isToggleOn ? styles.open : ""} ${styles.header}`}>
        <Link to="/" className={styles.logo} onClick={handleClick} >MB&H</Link>
        <div className={styles.group}>
          <ul className={styles.navigation}>
            <li><Link to="/shop" onClick={handleClick}>Tienda</Link></li>
            {
              userData ? < LinksNavbar userData={userData} />: <li><Link  onClick={handleClick} to="auth">Ingresar</Link></li>
            }
            <li onClick={handleClickCart}><CartIcon /></li>
          </ul>
          <div className={styles.search}>
            <span className={styles.icon}>
              <img
                src={searchBtn}
                alt="SearchBtn"
                name="search-outline"
                className={`${styles.searchBtn} ${isOpen ? styles.active : ""}`}
                onClick={handleClickSearchBtn}
              />
              <img
                src={closeBtn}
                alt="CloseBtn"
                name="close-outline"
                className={`${styles.closeBtn}  ${isOpen ? styles.active : ""}`}
                onClick={handleClickCloseBtn}
              />
            </span>
          </div>
          <img
            src={menuBtn}
            alt="MenuBtn"
            className={`${styles.menuToggle}  ${isOpen ? styles.hide : ""}`}
            onClick={handleClickHeader}
          />
        </div>
        <div className={`${styles.searchBox}  ${isOpen ? styles.active : ""}`}>
          <input
            type="text"
            name="searchBox"
            placeholder="Busca algo para tu bebé..."
            onChange={(e) => { handleChange(e) }}
          />
        </div>
      </header>
    </>
  );
}

export default Navigation
