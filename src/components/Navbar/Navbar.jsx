import { NavLink, Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useEffect, useState } from "react";
import { getWishlistItems } from "../../utils/wishlistStorage";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/products" },
  { label: "New Arrivals", to: "/products?sort=new" },
  { label: "Sale", to: "/products?sale=true" },
  { label: "Orders", to: "/orders" },
];

function Navbar() {
  const [hasToken, setHasToken] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const syncState = () => {
      setHasToken(Boolean(localStorage.getItem("auth_token")));
      setWishlistCount(getWishlistItems().length);
    };

    syncState();
    window.addEventListener("storage", syncState);
    window.addEventListener("wishlist-updated", syncState);

    return () => {
      window.removeEventListener("storage", syncState);
      window.removeEventListener("wishlist-updated", syncState);
    };
  }, []);

  const closeMenuOnMobile = () => {
    const collapseElement = document.getElementById("mainNavbar");
    if (!collapseElement || window.innerWidth > 991) {
      return;
    }

    if (collapseElement.classList.contains("show") && window.bootstrap?.Collapse) {
      window.bootstrap.Collapse.getOrCreateInstance(collapseElement).hide();
    }
  };

  return (
    <nav className={`navbar navbar-expand-lg ${styles.navbar}`}>
      <div className="container">
        <Link className={styles.logo} to="/">
          STITCH<span>CTRL</span>
        </Link>

        <button
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
          className={`navbar-toggler ${styles.toggler}`}
          data-bs-target="#mainNavbar"
          data-bs-toggle="collapse"
          type="button"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className={`navbar-nav mx-auto ${styles.links}`}>
            {navLinks.map((link) => (
              <li className="nav-item" key={link.label}>
                <NavLink
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ""}`
                  }
                  onClick={closeMenuOnMobile}
                  to={link.to}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            <NavLink className={styles.iconLink} onClick={closeMenuOnMobile} to="/wishlist">
              Wishlist {wishlistCount > 0 ? `(${wishlistCount})` : ""}
            </NavLink>
            <NavLink className={styles.iconLink} onClick={closeMenuOnMobile} to="/cart">
              Cart
            </NavLink>
            <NavLink
              className={styles.loginLink}
              onClick={closeMenuOnMobile}
              to={hasToken ? "/profile" : "/login"}
            >
              {hasToken ? "Profile" : "Login"}
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
