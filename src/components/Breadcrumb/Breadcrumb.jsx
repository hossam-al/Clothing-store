import { Link, useLocation, useParams } from "react-router-dom";
import styles from "./Breadcrumb.module.css";

const routeLabels = {
  cart: "Cart",
  checkout: "Checkout",
  login: "Login",
  orders: "Orders",
  products: "Products",
  profile: "Profile",
  register: "Register",
  wishlist: "Wishlist",
};

function formatSegment(segment) {
  return routeLabels[segment] || segment.replaceAll("-", " ");
}

function Breadcrumb() {
  const location = useLocation();
  const params = useParams();
  const segments = location.pathname.split("/").filter(Boolean);

  if (!segments.length) {
    return null;
  }

  const crumbs = segments.map((segment, index) => {
    const path = `/${segments.slice(0, index + 1).join("/")}`;
    const isProductId = segments[index - 1] === "products" && segment === params.id;

    return {
      label: isProductId ? "Product Details" : formatSegment(segment),
      path,
    };
  });

  return (
    <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
      <div className="container">
        <ol>
          <li>
            <Link to="/">Home</Link>
          </li>
          {crumbs.map((crumb, index) => {
            const isLast = index === crumbs.length - 1;

            return (
              <li aria-current={isLast ? "page" : undefined} key={crumb.path}>
                {isLast ? <span>{crumb.label}</span> : <Link to={crumb.path}>{crumb.label}</Link>}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}

export default Breadcrumb;
