import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../api/authApi";
import Button from "../../components/Button/Button";
import { saveAuthSession } from "../../utils/authStorage";
import styles from "./RegisterPage.module.css";

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
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
      const response = await register(formData);
      saveAuthSession(response);
      setMessage("Account created successfully.");
      navigate("/profile");
    } catch (error) {
      setMessage(
        error?.response?.data?.message || "Registration failed. Try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <span>Join the drop</span>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            onChange={handleChange}
            placeholder="Full name"
            type="text"
            value={formData.name}
          />
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
          <Button type="submit" variant="purple">
            {isSubmitting ? "Creating..." : "Create Account"}
          </Button>
        </form>
        {message && <p className={styles.message}>{message}</p>}
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
}

export default RegisterPage;
