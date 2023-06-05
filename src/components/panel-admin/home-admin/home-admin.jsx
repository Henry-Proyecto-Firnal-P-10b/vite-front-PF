import styles from "../home-admin/home-admin.module.css"
import { useSelector } from "react-redux"
import { numberFormat } from "../../../helper/numberFormat";


const HomeAdmin = () => {

  const selector = useSelector(state => state.cart)
  const { orders } = useSelector(state => state.orders)
  
  const currentDate = new Date();
  const todaysDate = currentDate.getFullYear()+'/' +String(currentDate.getMonth()+1).padStart(2, '0')+'/'+String(currentDate.getDate()).padStart(2, '0');

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}/${month}/${day}`;
    return formattedDate;
  };
  console.log(todaysDate);
//Ordenes del dia
  const ordersDate = orders.map((order) => {
    const orderDate = order.date
    const firebaseTime = new Date(orderDate.seconds * 1000 + orderDate.nanoseconds / 1000000)
    const fecha = firebaseTime.toDateString();
    const formattedDate = formatDate(fecha);
    return formattedDate
  })
  console.log(ordersDate);
  //Precio y dia
  const datePrice = orders.map((order) => {
    const orderDate = order.date
    const firebaseTime = new Date(orderDate.seconds * 1000 + orderDate.nanoseconds / 1000000)
    const fecha = firebaseTime.toDateString();
    const formattedDate = formatDate(fecha);
    const orderPrice = order.totalPrice;
    const both = {formattedDate,orderPrice}
    return both
  })

  const todayOrder = () => {
    const todaysOrders = ordersDate.filter((order) => order.includes(todaysDate));
  if(todaysOrders.length > 0) return todaysOrders.length;
  else return "0 orders";
  }
  const allTodayOrders = todayOrder();
  
// Ordenes de la semana
const weeksOrders = () => {
  const todayW = new Date()
  todayW.setDate(todayW.getDate() - 7);
  const currentWeekString = formatDate(todayW);
  const lastWeeksOrders = ordersDate.filter((date) => date >= currentWeekString && date <= todaysDate).length;
  return lastWeeksOrders;
}
const allWeeksOrders = weeksOrders();

// Ordenes del mes
const monthOrders = () => {
  const todayM = new Date()
  todayM.setDate(todayM.getDate() - 30);
  const currentMonthString = formatDate(todayM);
  const lastMonthOrders = ordersDate.filter((date) => date >= currentMonthString && date <= todaysDate).length;
  return lastMonthOrders;
}
const allMonthOrders = monthOrders();

//Ganancias del mes
const todayPW = new Date();
const monthEarningsF = () => {
  const lastMonth = new Date();
  lastMonth.setDate(currentDate.getDate() - 30);
  
  const filteredData = datePrice.filter(item => {
    const itemDate = new Date(item.formattedDate);
    return itemDate >= lastMonth && itemDate <= currentDate;
  });
  const totalEarnings = filteredData.reduce((total, item) => total + item.orderPrice, 0);
  return totalEarnings
}
const monthEarnings = monthEarningsF()


//Ganancias de la semana
const lastWeek = new Date();
const weekEarningsF = () => {
  lastWeek.setDate(currentDate.getDate() - 7);
  const filteredData = datePrice.filter(item => {
    const itemDate = new Date(item.formattedDate);
    return itemDate >= lastWeek && itemDate <= currentDate;
  });
  const totalEarnings = filteredData.reduce((total, item) => total + item.orderPrice, 0);
  return totalEarnings
}
const weekEarnings = weekEarningsF()

//Ganancias de hoy
const today = new Date();
const filteredData = datePrice.filter(item => {
  const itemDate = new Date(item.formattedDate);
  return itemDate.toDateString() === today.toDateString();
});
const todayEarnings = filteredData.reduce((total, item) => total + item.orderPrice, 0);





  return (
<div className={styles.base}>

    <h1>Panel Principal</h1>
    <div className={styles.container}>
      <p className={styles.item}>Ordenes</p>
      <div className={styles.flex}>
        <div className={styles.areaPanel}>
          <p className={styles.title}>Hoy</p>
          <div className={styles.orders}>
          {allTodayOrders > 0 ? allTodayOrders : 0}
          </div>
          <p className={styles.vExtra}>Órdenes del día</p>
        </div>

        <div className={styles.areaPanel}>
          <p className={styles.title}>Esta semana</p>
          <div className={styles.orders}>
          {allWeeksOrders > 0 ? allWeeksOrders : 0}
          </div>
          <p className={styles.vExtra}>Órdenes esta semana</p>
        </div>

        <div className={styles.areaPanel}>
          <p className={styles.title}>Este mes</p>
          <div className={styles.orders}>
          {allMonthOrders > 0 ? allMonthOrders : 0}
          </div>
          <p className={styles.vExtra}>Órdenes en el mes</p>
        </div>
      </div>

      <p className={styles.item}>Ingresos</p>
      
      <div className={styles.flex}>
        <div className={styles.areaPanel}>
          <p className={styles.title}>Hoy</p>
          <div className={styles.orders}>
          {todayEarnings ? numberFormat(todayEarnings) : '$0'}
          </div>
          <p className={styles.vExtra}>Ganancias del día</p>
        </div>

        <div className={styles.areaPanel}>
          <p className={styles.title}>Esta semana</p>
          <div className={styles.orders}>
          {weekEarnings ? numberFormat(weekEarnings) : '$0'}
          </div>
          <p className={styles.vExtra}>Ganancias esta semana</p>
        </div>

        <div className={styles.areaPanel}>
          <p className={styles.title}>Este mes</p>
          <div className={styles.orders}>
          {monthEarnings ? numberFormat(monthEarnings) : '$0'}
          </div>
          <p className={styles.vExtra}>Ganancias en el mes</p>
        </div>
      </div>
    </div>
   
    </div>
  )
}

export default HomeAdmin