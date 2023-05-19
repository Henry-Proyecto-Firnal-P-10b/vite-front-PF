import setDataUser from "../../../helper/setDataUser";
import { getUserByid } from "../../../utils/firebase/firebaseClient";
import styles from "./user.module.css";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { getUserData } from "../../../features/userData/userDataSlice";

const User = () => {
  const data = useSelector((state) => state.currentUser.userCredentials);
  const userData = useSelector(
    (state) => state.persistedReducer.userData.userData
  );

  const dispatch = useDispatch();

  const handlerActive = async (propiedad, contenido) => {
    if (!contenido) {
      Swal.fire({
        title: "Desactivar usuario?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#1ac8db",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirmar",
      }).then((result) => {
        if (result.isConfirmed) {
          const f = async () => {
            await setDataUser(propiedad, contenido, data.uid);
            getUserByid(data.uid, dat =>{dispatch(getUserData(dat.data()));})
          };
          f();
        }
      });
    } else {
      Swal.fire({
        title: "Activar el usuario?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#1ac8db",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirmar",
      }).then((result) => {
        if (result.isConfirmed) {
          const f = async () => {
            await setDataUser(propiedad, contenido, data.uid);
            getUserByid(data.uid, dat =>{dispatch(getUserData(dat.data()));})
          };
          f();
        }
      });
    }
  };
  const img = data?.photoURL;
  return (
    <div className={styles.perfil}>
      <div className={styles.container}>
        <h1>Mi perfil</h1>
        <div>
          <div className={styles.margin}>
            {(img && (
              <img src={img} alt="User" className={styles.imgUsuario} />
            )) || (
              <img
                src="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png"
                className={styles.imgUsuario}
                alt="usr"
                width={"150vw"}
              />
            )}
          </div>
          <div className={styles.infUsrBase}>
            <h3>Datos</h3>
          </div>
          <div className={styles.containerData}>
            <div className={styles.name}>
              <p>{data?.displayName}</p>
            </div>
            <div className={styles.email}>
              <p>{data?.email}</p>
            </div>
          </div>
          <div className={styles.boton}>
            {userData.active ? (
              <button onClick={() => handlerActive("active", false)}>
                Desactivar
              </button>
            ) : (
              <button onClick={() => handlerActive("active", true)}>
                Activar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
