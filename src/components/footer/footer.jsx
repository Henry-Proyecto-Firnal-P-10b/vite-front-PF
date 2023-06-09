import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Link } from "react-router-dom";
import styles from './footer.module.css'


const IconsSx = {
  "&:hover": {
    color: "rgba(26, 200, 219, .7)",
    position: "relative",
    top: "-1px",
    transform: "scale(1.1)"
  }
}

const Footer = () => {
  return (
    <footer className={styles.footerContainer}>

      <section className={styles.madeFooterContainer}>
        <Link to="/made-by" >Creadores</Link>
        <Link to="/contact-us" >Contactanos</Link>
      </section>

      <section className={styles.logoFooterContainer}>
        <span>Mom Baby &#38; Home </span>
        <span>&copy;{` All Rights Reserved ${new Date().getFullYear()} `}</span>
      </section>

      <section className={styles.networkContainer}>
        <Link to="https://www.instagram.com/mombaby_home/?igshid=14xly8yt3crjg" target='_blank'>
          <InstagramIcon color='primary' sx={IconsSx} />
        </Link>
        <Link to="https://www.facebook.com/MomBabyhomecol/" target='_blank'>
          <FacebookIcon color='primary' sx={IconsSx} />
        </Link>
        <Link to="https://api.whatsapp.com/send?phone=573052407581" target='_blank'>
          <WhatsAppIcon color='primary' sx={IconsSx} />
        </Link>
      </section>

    </footer>
  )

};

export default Footer;
