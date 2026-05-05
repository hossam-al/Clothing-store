import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { login } from "../../api/authApi";
import Button from "../../components/Button/Button";
import { useAuth } from "../../context/authContextValue";
import styles from "./LoginPage.module.css";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, setAuthSession } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const redirectTo = location.state?.from?.pathname || "/profile";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await login(formData);
      const { token } = setAuthSession(response);

      setMessage(token ? "Logged in successfully." : "Login completed.");
      navigate(redirectTo, { replace: true });
    } catch (error) {
      setMessage(
        error?.response?.data?.message || "Login failed. Check your credentials.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate replace to="/profile" />;
  }

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <span>Welcome back</span>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            name="email"
            onChange={handleChange}
            placeholder="Email address"
            type="email"
            value={formData.email}
          />
          <input
            name="password"
            onChange={handleChange}
            placeholder="Password"
            type="password"
            value={formData.password}
          />
          <Button type="submit" variant="orange">
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>
        {message && <p className={styles.message}>{message}</p>}
        <p>
          New customer? <Link to="/register">Create account</Link>
        </p>
      </div>
    </main>
  );
}

export default LoginPage;
