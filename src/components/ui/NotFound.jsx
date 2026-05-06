import { FaMagnifyingGlass } from "react-icons/fa6";
import Button from "../Button/Button";
import styles from "./StatusPage.module.css";

function NotFound({
  code = "404",
  title = "Page not found",
  text = "The page you are looking for does not exist or may have been moved.",
  homeTo = "/",
  shopTo = "/products",
}) {
  return (
    <main className={styles.page}>
      <div className="container">
        <section className={styles.card}>
          <span className={styles.code}>{code}</span>
          <div className={styles.icon}>
            <FaMagnifyingGlass />
          </div>
          <h1>{title}</h1>
          <p>{text}</p>
          <div className={styles.actions}>
            <Button to={homeTo} variant="orange">
              Back Home
            </Button>
            <Button to={shopTo} variant="outline">
              Shop Products
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}

export default NotFound;
