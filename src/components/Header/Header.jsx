import { useEffect, useState } from "react";
import {
  FaBars,
  FaHeart,
  FaRegUser,
  FaSearch,
  FaShoppingBag,
  FaTimes,
} from "react-icons/fa";
import { GiRunningShoe } from "react-icons/gi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../api/authApi";
import { useAuth } from "../../context/authContextValue";
import { getWishlistItems } from "../../utils/wishlistStorage";
import styles from "./Header.module.css";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/products" },
  { label: "New Arrivals", to: "/products?sort=new" },
  { label: "Sale", to: "/products?sale=true" },
];

function Header() {
  const navigate = useNavigate();
  const { clearAuth, isAuthenticated, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const syncWishlist = () => setWishlistCount(getWishlistItems().length);

    syncWishlist();
    window.addEventListener("storage", syncWishlist);
    window.addEventListener("wishlist-updated", syncWishlist);

    return () => {
      window.removeEventListener("storage", syncWishlist);
      window.removeEventListener("wishlist-updated", syncWishlist);
    };
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    const query = searchTerm.trim();

    navigate(query ? `/products?search=${encodeURIComponent(query)}` : "/products");
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // Local logout still wins if the API token is missing or expired.
    } finally {
      clearAuth();
      setIsMenuOpen(false);
      navigate("/login");
    }
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <div className={`container ${styles.inner}`}>
          <Link className={styles.logo} to="/">
            <GiRunningShoe />
            <span>URBAN WEAR</span>
          </Link>

          <div className={styles.desktopLinks}>
            {navLinks.map((link) => (
              <NavLink
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ""}`
                }
                key={link.label}
                to={link.to}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <form className={styles.search} onSubmit={handleSearch}>
            <FaSearch />
            <input
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search for products, brands, categories..."
              type="search"
              value={searchTerm}
            />
          </form>

          <button
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
            className={styles.menuToggle}
            onClick={() => setIsMenuOpen((current) => !current)}
            type="button"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          <div className={styles.actions}>
            <Link to="/wishlist">
              <span className={styles.iconWrap}>
                <FaHeart />
                {wishlistCount > 0 && <em>{wishlistCount}</em>}
              </span>
              <strong>Wishlist</strong>
            </Link>
            <Link to="/cart">
              <span className={styles.iconWrap}>
                <FaShoppingBag />
              </span>
              <strong>Cart</strong>
            </Link>
            <div className={`dropdown ${styles.accountDropdown}`}>
              <button
                aria-expanded="false"
                className={styles.accountButton}
                data-bs-toggle="dropdown"
                type="button"
              >
                <span className={styles.iconWrap}>
                  <FaRegUser />
                </span>
                <strong>{isAuthenticated ? user?.name || "Account" : "Account"}</strong>
              </button>
              <ul className={`dropdown-menu dropdown-menu-end ${styles.accountMenu}`}>
                {isAuthenticated ? (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/profile">
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/orders">
                        My Orders
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout} type="button">
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/login">
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/register">
                        Register
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ""}`}>
          <div className={`container ${styles.mobileMenuInner}`}>
            <form className={styles.mobileSearch} onSubmit={handleSearch}>
              <FaSearch />
              <input
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search products..."
                type="search"
                value={searchTerm}
              />
            </form>

            <div className={styles.mobileLinks}>
              {navLinks.map((link) => (
                <NavLink
                  className={({ isActive }) =>
                    `${styles.mobileLink} ${isActive ? styles.active : ""}`
                  }
                  key={link.label}
                  onClick={() => setIsMenuOpen(false)}
                  to={link.to}
                >
                  {link.label}
                </NavLink>
              ))}
              {isAuthenticated && (
                <>
                  <NavLink
                    className={styles.mobileLink}
                    onClick={() => setIsMenuOpen(false)}
                    to="/orders"
                  >
                    Orders
                  </NavLink>
                  <NavLink
                    className={styles.mobileLink}
                    onClick={() => setIsMenuOpen(false)}
                    to="/profile"
                  >
                    Profile
                  </NavLink>
                </>
              )}
            </div>

            <div className={styles.mobileActions}>
              <Link onClick={() => setIsMenuOpen(false)} to="/wishlist">
                Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
              </Link>
              <Link onClick={() => setIsMenuOpen(false)} to="/cart">
                Cart
              </Link>
              {isAuthenticated ? (
                <button onClick={handleLogout} type="button">
                  Logout
                </button>
              ) : (
                <>
                  <Link onClick={() => setIsMenuOpen(false)} to="/login">
                    Login
                  </Link>
                  <Link onClick={() => setIsMenuOpen(false)} to="/register">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
