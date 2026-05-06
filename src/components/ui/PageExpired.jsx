import { FaClockRotateLeft } from "react-icons/fa6";
import Button from "../Button/Button";
import styles from "./StatusPage.module.css";

function PageExpired({
  code = "419",
  title = "Page expired",
  text = "Your session or form has expired. Please refresh the page and try again.",
  retryTo = "/login",
  homeTo = "/",
}) {
  return (
    <main className={styles.page}>
      <div className="container">
        <section className={styles.card}>
          <span className={styles.code}>{code}</span>
          <div className={styles.icon}>
            <FaClockRotateLeft />
          </div>
          <h1>{title}</h1>
          <p>{text}</p>
          <div className={styles.actions}>
            <Button to={retryTo} variant="orange">
              Try Again
            </Button>
            <Button to={homeTo} variant="outline">
              Back Home
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}

export default PageExpired;
