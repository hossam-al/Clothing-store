import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../api/authApi";
import Button from "../../components/Button/Button";
import styles from "./ProfilePage.module.css";

function ProfilePage() {
  const navigate = useNavigate();
  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("auth_user")) || null;
    } catch {
      return null;
    }
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // Session is cleared locally even if the token is already invalid.
    } finally {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
      navigate("/login");
    }
  };

  return (
    <main className={styles.page}>
      <div className="container">
        <div className="page-title">
          <h1>Profile</h1>
          <p className="text-muted-store">Basic customer profile placeholder.</p>
        </div>

        <section className={styles.card}>
          <div>
            <span>Customer</span>
            <h2>{user?.name || "Streetwear Member"}</h2>
            <p>{user?.email || "profile@example.com"}</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </section>
      </div>
    </main>
  );
}

export default ProfilePage;
