import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import style from "./footer.module.css";
import { Container } from "@mui/material";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

//Verificar que hace este various (const Various =)
styled("h2")(({ theme }) => ({
  color: "black",
  textAlign: "start",
  fontSize: theme.typography.pxToRem(6),
  fontWeight: "normal",
  [theme.breakpoints.up("sm")]: {
    fontSize: theme.typography.pxToRem(17),
  },
}));

const Footer = () => {
  return (
    <div className={style.fullCont}>
      <Container maxWidth="lg">
        <div className={style.footerCont}>
          <div className={style.titulo}>Mom Home & Baby</div>
          <div className={style.varios}>
            <Link>CONTACT</Link> / <Link to="/aboutUs"> ABOUT US </Link> / FAQ
            <WhatsAppIcon
              sx={{
                color: "black",
                // marginRight: '-6rem',
                float: "right",
                fontSize: 25,
              }}
            />
            <InstagramIcon
              sx={{
                color: "black",
                // marginRight: '-3rem',
                float: "right",
                fontSize: 25,
              }}
            />
          </div>
        </div>
        <hr />
        <div className={style.tipografia}>
          {`@${new Date().getFullYear()} MH&B. All Rights Reserved.`}
        </div>
      </Container>
    </div>
  );
};

export default Footer;
