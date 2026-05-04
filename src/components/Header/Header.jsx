import MuiButton from "@mui/material/Button";
import { useEffect, useMemo, useState } from "react";
import {
  FaBars,
  FaChevronDown,
  FaFire,
  FaHeart,
  FaRegUser,
  FaSearch,
  FaShoppingBag,
  FaTags,
  FaTimes,
} from "react-icons/fa";
import { GiRunningShoe } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../api/authApi";
import { mockBrands } from "../../data/mockBrands";
import { mockCategories } from "../../data/mockCategories";
import styles from "./Header.module.css";

const featuredLinks = [
  { label: "New Arrivals", to: "/products?sort=new", text: "Fresh drops this week" },
  { label: "Sale Picks", to: "/products?sale=true", text: "Streetwear deals" },
  { label: "Best Sellers", to: "/products?sort=popular", text: "Most requested fits" },
];

function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem("auth_user")) || null;
  } catch {
    return null;
  }
}

function getUserImage(user) {
  return (
    user?.image ||
    user?.avatar ||
    user?.photo ||
    user?.profile_image ||
    user?.profile_photo_url ||
    ""
  );
}

function Header() {
  const navigate = useNavigate();
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMenuBarHidden, setIsMenuBarHidden] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(() => getStoredUser());

  const userImage = getUserImage(user);
  const userName = user?.name || user?.full_name || user?.username || "Account";
  const userInitial = useMemo(() => userName.trim().slice(0, 1).toUpperCase(), [userName]);

  useEffect(() => {
    const syncUser = () => setUser(getStoredUser());

    window.addEventListener("storage", syncUser);
    window.addEventListener("auth-updated", syncUser);

    return () => {
      window.removeEventListener("storage", syncUser);
      window.removeEventListener("auth-updated", syncUser);
    };
  }, []);

 

  const handleSearch = (event) => {
    event.preventDefault();
    const query = searchTerm.trim();

    navigate(query ? `/products?search=${encodeURIComponent(query)}` : "/products");
  };

  const closeMenus = () => {
    setIsMegaMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  const clearSession = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    window.dispatchEvent(new Event("auth-updated"));
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // Local session is cleared even if the server token is already expired.
    } finally {
      clearSession();
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

          <MuiButton
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle mobile menu"
            className={styles.mobileMenuButton}
            disableElevation
            disableRipple
            onClick={() => setIsMobileMenuOpen((current) => !current)}
            sx={{
              backgroundColor: "var(--color-highlight-orange)",
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "var(--color-highlight-orange-hover)",
              },
            }}
            type="button"
            variant="contained"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </MuiButton>

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
              <MuiButton
                aria-expanded="false"
                className={styles.accountButton}
                data-bs-toggle="dropdown"
                type="button"
              >
                {user ? (
                  <span className={styles.userAvatar}>
                    {userImage ? <img alt={userName} src={userImage} /> : userInitial}
                  </span>
                ) : (
                  <span className={styles.iconWrap}>
                    <FaRegUser />
                  </span>
                )}
                <strong className={styles.accountName}>{userName}</strong>
              </MuiButton>
              <ul className={`dropdown-menu dropdown-menu-end ${styles.accountMenu}`}>
                {user ? (
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
                      <MuiButton
                        className={`dropdown-item ${styles.logoutButton}`}
                        onClick={handleLogout}
                        type="button"
                      >
                        Logout
                      </MuiButton>
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
      </nav>

      <div
        className={`${styles.menuBar} ${
          isMobileMenuOpen ? styles.menuBarOpen : ""
        } ${isMenuBarHidden ? styles.menuBarHidden : ""}`}
      >
        <div className={`container ${styles.menuInner}`}>
          <div
            className={`${styles.megaMenuWrap} ${
              isMegaMenuOpen ? styles.megaMenuOpen : ""
            }`}
          >
            <MuiButton
              aria-expanded={isMegaMenuOpen}
              className={styles.shopButton}
              onClick={() => setIsMegaMenuOpen((current) => !current)}
              type="button"
            >
              Shop Categories
              <FaChevronDown />
            </MuiButton>

            <div className={styles.megaMenu}>
              <div className={styles.megaPanel}>
                <div className={styles.categoryGrid}>
                  {mockCategories.map((category) => {
                    const Icon = category.icon;

                    return (
                      <Link
                        className={styles.categoryLink}
                        key={category.id}
                        onClick={closeMenus}
                        to={`/products?category=${encodeURIComponent(category.name)}`}
                      >
                        <span className={styles.categoryIcon}>
                          <Icon />
                        </span>
                        <span>
                          <strong>{category.name}</strong>
                          <small>{category.text}</small>
                        </span>
                      </Link>
                    );
                  })}
                </div>

                <div className={styles.megaColumn}>
                  <h2>Featured</h2>
                  {featuredLinks.map((link) => (
                    <Link
                      className={styles.featuredLink}
                      key={link.label}
                      onClick={closeMenus}
                      to={link.to}
                    >
                      <FaFire />
                      <span>
                        <strong>{link.label}</strong>
                        <small>{link.text}</small>
                      </span>
                    </Link>
                  ))}
                </div>

                <div className={styles.megaColumn}>
                  <h2>Brands</h2>
                  <div className={styles.brandList}>
                    {mockBrands.slice(0, 6).map((brand) => (
                      <Link
                        key={brand.id}
                        onClick={closeMenus}
                        to={`/products?brand=${encodeURIComponent(brand.name)}`}
                      >
                        <FaTags />
                        <span>{brand.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.quickLinks}>
            <Link onClick={closeMenus} to="/products?sort=new">
              New Arrivals
            </Link>
            <Link onClick={closeMenus} to="/products?sale=true">
              Sale
            </Link>
            <Link onClick={closeMenus} to="/orders">
              Orders
            </Link>
          </div>

          <div
            aria-hidden={!isMobileMenuOpen}
            className={`${styles.mobileOverlay} ${
              isMobileMenuOpen ? styles.mobileOverlayOpen : ""
            }`}
            onClick={closeMenus}
          />

          <div
            className={`${styles.mobileMenu} ${
              isMobileMenuOpen ? styles.mobileMenuOpen : ""
            }`}
          >
            <div className={styles.mobileMenuHead}>
              <strong>Menu</strong>
              <MuiButton aria-label="Close mobile menu" onClick={closeMenus} type="button">
                <FaTimes />
              </MuiButton>
            </div>

            <Link onClick={closeMenus} to="/products">
              Shop All
            </Link>
            <Link onClick={closeMenus} to="/products?sort=new">
              New Arrivals
            </Link>
            <Link onClick={closeMenus} to="/products?sale=true">
              Sale
            </Link>
            <Link onClick={closeMenus} to="/orders">
              Orders
            </Link>

            <div className={styles.mobileMenuSection}>
              <strong>Categories</strong>
              {mockCategories.map((category) => {
                const Icon = category.icon;

                return (
                  <Link
                    key={category.id}
                    onClick={closeMenus}
                    to={`/products?category=${encodeURIComponent(category.name)}`}
                  >
                    <Icon />
                    <span>{category.name}</span>
                  </Link>
                );
              })}
            </div>

            <div className={styles.mobileMenuSection}>
              <strong>Brands</strong>
              {mockBrands.slice(0, 6).map((brand) => (
                <Link
                  key={brand.id}
                  onClick={closeMenus}
                  to={`/products?brand=${encodeURIComponent(brand.name)}`}
                >
                  <FaTags />
                  <span>{brand.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
