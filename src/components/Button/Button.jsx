import { Link } from "react-router-dom";
import styles from "./Button.module.css";

function Button({
  children,
  to,
  variant = "primary",
  type = "button",
  className = "",
  ...props
}) {
  const classNames = `${styles.button} ${styles[variant]} ${className}`.trim();

  if (to) {
    return (
      <Link className={classNames} to={to} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classNames} type={type} {...props}>
      {children}
    </button>
  );
}

export default Button;
