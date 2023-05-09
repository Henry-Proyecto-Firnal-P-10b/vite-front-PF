import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./filters.module.css";

const Filters = () => {
  const [showMenu1, setShowMenu1] = useState(false);
  const [showMenu2, setShowMenu2] = useState(false);

  const handleClick1 = () => {
    setShowMenu1(!showMenu1);
  };

  const handleClick2 = () => {
    setShowMenu2(!showMenu2);
  };

  return (
    <aside className={styles.filtersContainer}>
      <div className={styles.fitersTitle}>filtros</div>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={`${styles.listItem} ${styles.listItemClick}`}>
            <div
              className={`${styles.listButton} ${styles.listButtonClick}`}
              onClick={handleClick1}
            >
              <span className={styles.navLink}>
                Categorias
              </span>
            </div>
            <ul
              className={styles.listShow}
              style={{ height: showMenu1 ? "auto" : "0px" }}
            >
              <li className={styles.listInside}>
                <Link
                  to="#"
                  className={`${styles.navLink} ${styles.navLinkInside}`}
                >
                  Dentro
                </Link>
              </li>

              <li>
                <Link
                  to="#"
                  className={`${styles.navLink} ${styles.navLinkInside}`}
                >
                  Dentro
                </Link>
              </li>          

            </ul>
          </li>

          <li className={`${styles.listItem} ${styles.listItemClick}`}>
            <div
              className={`${styles.listButton} ${styles.listButtonClick}`}
              onClick={handleClick2}
            >
              <span className={styles.navLink}>
                Filtros
              </span>
              {/* <i className={`${styles.arrow} ${showMenu2 ? styles.arrowUp : styles.arrowDown}`} /> */}
            </div>
            <ul
              className={styles.listShow}
              style={{ height: showMenu2 ? "auto" : "0px" }}
            >
              <li className={styles.listInside}>
                <Link
                  to="#"
                  className={`${styles.navLink} ${styles.navLinkInside}`}
                >
                  Dentro
                </Link>
              </li>

              <li>
                <Link
                  to="#"
                  className={`${styles.navLink} ${styles.navLinkInside}`}
                >
                  Dentro
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Filters;
