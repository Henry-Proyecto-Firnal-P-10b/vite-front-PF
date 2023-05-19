import { Link } from "react-router-dom";
import { signOutUser } from "../../../utils/firebase/firebaseClient";
import { clearCart } from "../../../features/cartSlice/cartSlice";
import { useDispatch } from "react-redux";
import { clearOrderInf, clearUserData } from "../../../features/userData/userDataSlice";
import Swal from "sweetalert2";

const LinksNavbar = ({ userData }) => {
  const dispatch = useDispatch();


  const handleSignOut = () => {

    Swal.fire({
      title: 'Saldrás de esta página',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: "cancelar",
      confirmButtonColor: '#1ac8db',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Salir'
    }).then((result) => {
      if (result.isConfirmed) {
        //Se deslogea de todo 
        signOutUser();
        //Se elimina la informacion del persist
        dispatch(clearCart());
        dispatch(clearUserData());
        dispatch(clearOrderInf())
      }
    })


  }

  return (
    <>
      {
        userData.admin && <li><Link to="/admin">Admin</Link></li> 
        ||
        <>
        <li><Link to={'/perfil'}>Perfil</Link></li>
        <li><Link to={'/compras'}>mis Compras</Link></li>
       </>
      }
      <li onClick={handleSignOut}><Link>Salir</Link></li>
    </>)
}
export default LinksNavbar;