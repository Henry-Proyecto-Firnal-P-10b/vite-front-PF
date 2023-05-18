import { Link } from "react-router-dom";
import styles from "./aboutUs.module.css";
import john from './photos/john.jpg'
import bianca from './photos/bianca.jpg'
import felipe from './photos/felipe.jpg'
import mario from './photos/mario.jpg'
import ariana from './photos/ariana.jpg'
import daniel from './photos/daniel.jpg'

const AboutUs = () => {
  return (
    <div className={styles.conteiner}>
      <div className={styles.nosotros}>
        <h1>SOBRE NOSOTROS</h1>
      </div>
      <div className={styles.perfiles}>
        <div className={styles.git}>
          <div className={styles.name}>
            <p>John Santamaria</p>
          </div>
          <div className={styles.image}>
            <img
              src={john}
              alt="dev"
            />
          </div>
          <div className={styles.links}>
            <button>
              <Link to="https://github.com/JohnRSantamaria">
                <svg
                  width={28}
                  height={28}
                  fill="none"
                  stroke="#1fd2ff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16.25 22.5v-3.865a3.361 3.361 0 0 0-.94-2.607c3.14-.35 6.44-1.538 6.44-6.99a5.43 5.43 0 0 0-1.5-3.746 5.058 5.058 0 0 0-.09-3.765s-1.18-.35-3.91 1.478a13.397 13.397 0 0 0-7 0C6.52 1.177 5.34 1.527 5.34 1.527a5.058 5.058 0 0 0-.09 3.765 5.43 5.43 0 0 0-1.5 3.775c0 5.413 3.3 6.602 6.44 6.991a3.366 3.366 0 0 0-.94 2.577V22.5" />
                  <path d="M9.25 19.503c-5 1.498-5-2.496-7-2.996" />
                </svg>
              </Link>
            </button>
            <button>
              <Link to="https://www.linkedin.com/in/john-santamaria-dev/">
                <svg
                  width={28}
                  height={28}
                  fill="none"
                  stroke="#1fd2ff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <path d="M2 9h4v12H2z" />
                  <path d="M4 2a2 2 0 1 0 0 4 2 2 0 1 0 0-4z" />
                </svg>
              </Link>
            </button>
          </div>
        </div>
        <div className={styles.git}>
          <div className={styles.name}>
            <p>Bianca Stork</p>
          </div>
          <div className={styles.image}>
            <img
              src={bianca}
              alt="dev"
            />
          </div>
          <div className={styles.links}>
            <button>
              <Link to="https://github.com/BiancaStork">
                <svg
                  width={28}
                  height={28}
                  fill="none"
                  stroke="#1fd2ff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16.25 22.5v-3.865a3.361 3.361 0 0 0-.94-2.607c3.14-.35 6.44-1.538 6.44-6.99a5.43 5.43 0 0 0-1.5-3.746 5.058 5.058 0 0 0-.09-3.765s-1.18-.35-3.91 1.478a13.397 13.397 0 0 0-7 0C6.52 1.177 5.34 1.527 5.34 1.527a5.058 5.058 0 0 0-.09 3.765 5.43 5.43 0 0 0-1.5 3.775c0 5.413 3.3 6.602 6.44 6.991a3.366 3.366 0 0 0-.94 2.577V22.5" />
                  <path d="M9.25 19.503c-5 1.498-5-2.496-7-2.996" />
                </svg>
              </Link>
            </button>
            <button>
              <Link to="https://www.linkedin.com/in/bianca-stork">
                <svg
                  width={28}
                  height={28}
                  fill="none"
                  stroke="#1fd2ff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <path d="M2 9h4v12H2z" />
                  <path d="M4 2a2 2 0 1 0 0 4 2 2 0 1 0 0-4z" />
                </svg>
              </Link>
            </button>
          </div>
        </div>
        <div className={styles.git}>
          <div className={styles.name}>
            <p>Felipe Gavilan</p>
          </div>
          <div className={styles.image}>
            <img
              src={felipe}
              alt="dev"
            />
          </div>
          <div className={styles.links}>
            <button>
              <Link to="https://github.com/felipegavilan">
                <svg
                  width={28}
                  height={28}
                  fill="none"
                  stroke="#1fd2ff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16.25 22.5v-3.865a3.361 3.361 0 0 0-.94-2.607c3.14-.35 6.44-1.538 6.44-6.99a5.43 5.43 0 0 0-1.5-3.746 5.058 5.058 0 0 0-.09-3.765s-1.18-.35-3.91 1.478a13.397 13.397 0 0 0-7 0C6.52 1.177 5.34 1.527 5.34 1.527a5.058 5.058 0 0 0-.09 3.765 5.43 5.43 0 0 0-1.5 3.775c0 5.413 3.3 6.602 6.44 6.991a3.366 3.366 0 0 0-.94 2.577V22.5" />
                  <path d="M9.25 19.503c-5 1.498-5-2.496-7-2.996" />
                </svg>
              </Link>
            </button>
            <button>
              <Link to="https://www.linkedin.com/in/felipe-gavilan-b80348aa/">
                <svg
                  width={28}
                  height={28}
                  fill="none"
                  stroke="#1fd2ff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <path d="M2 9h4v12H2z" />
                  <path d="M4 2a2 2 0 1 0 0 4 2 2 0 1 0 0-4z" />
                </svg>
              </Link>
            </button>
          </div>
        </div>
        <div className={styles.git}>
          <div className={styles.name}>
            <p>Mario Derling Lopez Jimenez</p>
          </div>
          <div className={styles.image}>
            <img
              src={mario}
              alt="dev"
            />
          </div>
          <div className={styles.links}>
            <button>
              <Link to="https://github.com/DerlingM">
                <svg
                  width={28}
                  height={28}
                  fill="none"
                  stroke="#1fd2ff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16.25 22.5v-3.865a3.361 3.361 0 0 0-.94-2.607c3.14-.35 6.44-1.538 6.44-6.99a5.43 5.43 0 0 0-1.5-3.746 5.058 5.058 0 0 0-.09-3.765s-1.18-.35-3.91 1.478a13.397 13.397 0 0 0-7 0C6.52 1.177 5.34 1.527 5.34 1.527a5.058 5.058 0 0 0-.09 3.765 5.43 5.43 0 0 0-1.5 3.775c0 5.413 3.3 6.602 6.44 6.991a3.366 3.366 0 0 0-.94 2.577V22.5" />
                  <path d="M9.25 19.503c-5 1.498-5-2.496-7-2.996" />
                </svg>
              </Link>
            </button>
            <button>
              <Link to="https://www.linkedin.com/in/mario-derling-lopez-jimenez/">
                <svg
                  width={28}
                  height={28}
                  fill="none"
                  stroke="#1fd2ff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <path d="M2 9h4v12H2z" />
                  <path d="M4 2a2 2 0 1 0 0 4 2 2 0 1 0 0-4z" />
                </svg>
              </Link>
            </button>
          </div>
        </div>
        <div className={styles.git}>
          <div className={styles.name}>
            <p>Ariana Aguirre Rubio</p>
          </div>
          <div className={styles.image}>
            <img
              src={ariana}
              alt="dev"
            />
          </div>
          <div className={styles.links}>
            <button>
              <Link to="https://github.com/ariaguirre">
                <svg
                  width={28}
                  height={28}
                  fill="none"
                  stroke="#1fd2ff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16.25 22.5v-3.865a3.361 3.361 0 0 0-.94-2.607c3.14-.35 6.44-1.538 6.44-6.99a5.43 5.43 0 0 0-1.5-3.746 5.058 5.058 0 0 0-.09-3.765s-1.18-.35-3.91 1.478a13.397 13.397 0 0 0-7 0C6.52 1.177 5.34 1.527 5.34 1.527a5.058 5.058 0 0 0-.09 3.765 5.43 5.43 0 0 0-1.5 3.775c0 5.413 3.3 6.602 6.44 6.991a3.366 3.366 0 0 0-.94 2.577V22.5" />
                  <path d="M9.25 19.503c-5 1.498-5-2.496-7-2.996" />
                </svg>
              </Link>
            </button>
            <button>
              <Link to="https://www.linkedin.com/in/arianaaguirrerubio/">
                <svg
                  width={28}
                  height={28}
                  fill="none"
                  stroke="#1fd2ff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <path d="M2 9h4v12H2z" />
                  <path d="M4 2a2 2 0 1 0 0 4 2 2 0 1 0 0-4z" />
                </svg>
              </Link>
            </button>
          </div>
        </div>
        <div className={styles.git}>
          <div className={styles.name}>
            <p>Daniel Yesid Cely Robayo</p>
          </div>
          <div className={styles.image}>
            <img
              src={daniel}
              alt="dev"
            />
          </div>
          <div className={styles.links}>
            <button>
              <Link to="https://github.com/Dandy182">
                <svg
                  width={28}
                  height={28}
                  fill="none"
                  stroke="#1fd2ff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16.25 22.5v-3.865a3.361 3.361 0 0 0-.94-2.607c3.14-.35 6.44-1.538 6.44-6.99a5.43 5.43 0 0 0-1.5-3.746 5.058 5.058 0 0 0-.09-3.765s-1.18-.35-3.91 1.478a13.397 13.397 0 0 0-7 0C6.52 1.177 5.34 1.527 5.34 1.527a5.058 5.058 0 0 0-.09 3.765 5.43 5.43 0 0 0-1.5 3.775c0 5.413 3.3 6.602 6.44 6.991a3.366 3.366 0 0 0-.94 2.577V22.5" />
                  <path d="M9.25 19.503c-5 1.498-5-2.496-7-2.996" />
                </svg>
              </Link>
            </button>
            <button>
              <Link to="https://www.linkedin.com/in/daniel-yesid-cely-robayo-361b33164/">
                <svg
                  width={28}
                  height={28}
                  fill="none"
                  stroke="#1fd2ff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <path d="M2 9h4v12H2z" />
                  <path d="M4 2a2 2 0 1 0 0 4 2 2 0 1 0 0-4z" />
                </svg>
              </Link>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutUs;
