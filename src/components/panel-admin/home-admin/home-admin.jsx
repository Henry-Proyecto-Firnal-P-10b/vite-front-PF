
import styles from "../home-admin/home-admin.module.css"
import { useSelector } from "react-redux"


const HomeAdmin = () => {

  const selector = useSelector(state => state.cart)

  console.log(selector)


  return (
<div className={styles.base}>

    <h1>Panel Principal</h1>
    <div className={styles.container}>
      <p className={styles.item}>Ordenes</p>
      <div className={styles.flex}>
        <div className={styles.areaPanel}>
          <p className={styles.title}>Hoy</p>
          <p className={styles.value}>2</p>
          <p className={styles.vExtra}>Ordenes del día</p>
        </div>

        <div className={styles.areaPanel}>
          <p className={styles.title}>Esta semana</p>
          <p className={styles.value}>25</p>
          <p className={styles.vExtra}>Ordenes esta semana</p>
        </div>

        <div className={styles.areaPanel}>
          <p className={styles.title}>Este mes</p>
          <p className={styles.value}>32</p>
          <p className={styles.vExtra}>Ordenes en el mes</p>
        </div>
      </div>

      <p className={styles.item}>Ingresos</p>
      
      <div className={styles.flex}>
        <div className={styles.areaPanel}>
          <p className={styles.title}>Hoy</p>
          <p className={styles.value}>2</p>
          <p className={styles.vExtra}>Ordenes del día</p>
        </div>

        <div className={styles.areaPanel}>
          <p className={styles.title}>Esta semana</p>
          <p className={styles.value}>25</p>
          <p className={styles.vExtra}>Ordenes esta semana</p>
        </div>

        <div className={styles.areaPanel}>
          <p className={styles.title}>Este mes</p>
          <p className={styles.value}>32</p>
          <p className={styles.vExtra}>Ordenes en el mes</p>
        </div>
      </div>
    </div>
   
    </div>
  )
}

export default HomeAdmin