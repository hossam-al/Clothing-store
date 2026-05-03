import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/authApi";
import Button from "../../components/Button/Button";
import { saveAuthSession } from "../../utils/authStorage";
import styles from "./LoginPage.module.css";

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

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
      const { token } = saveAuthSession(response);

      setMessage(token ? "Logged in successfully." : "Login completed.");
      navigate("/profile");
    } catch (error) {
      setMessage(
        error?.response?.data?.message || "Login failed. Check your credentials.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
