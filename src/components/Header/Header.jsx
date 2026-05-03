import { useState } from "react";
import { FaHeart, FaRegUser, FaSearch, FaShoppingBag } from "react-icons/fa";
import { GiRunningShoe } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    const query = searchTerm.trim();

    navigate(query ? `/products?search=${encodeURIComponent(query)}` : "/products");
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <div className={`container ${styles.inner}`}>
          <Link className={styles.logo} to="/">
            <GiRunningShoe />
            <span>URBAN WEAR</span>
          </Link>

          <form className={styles.search} onSubmit={handleSearch}>
            <FaSearch />
            <input
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search for products, brands, categories..."
              type="search"
              value={searchTerm}
            />
          </form>

          <div className={styles.actions}>
            <Link to="/wishlist">
              <span className={styles.iconWrap}>
                <FaHeart />
                <em>2</em>
              </span>
              <strong>Wishlist</strong>
            </Link>
            <Link to="/cart">
              <span className={styles.iconWrap}>
                <FaShoppingBag />
                <em>3</em>
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
                <strong>Account</strong>
              </button>
              <ul className={`dropdown-menu dropdown-menu-end ${styles.accountMenu}`}>
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
                  <Link className="dropdown-item" to="/login">
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
