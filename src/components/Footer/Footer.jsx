import { FaFacebookF, FaInstagram, FaTiktok, FaXTwitter } from "react-icons/fa6";
import { GiRunningShoe } from "react-icons/gi";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4">
            <a className={styles.logo} href="#">
              <GiRunningShoe />
              <span>URBAN WEAR</span>
            </a>
            <p>
              A modern streetwear destination for oversized fits, sneakers,
              accessories, and daily statement pieces.
            </p>
          </div>

          <div className="col-6 col-lg-2">
            <h3>Quick Links</h3>
            <a href="#">Home</a>
            <a href="#">Shop</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </div>

          <div className="col-6 col-lg-2">
            <h3>Customer Service</h3>
            <a href="#">Shipping</a>
            <a href="#">Returns</a>
            <a href="#">FAQs</a>
            <a href="#">Track Order</a>
          </div>

          <div className="col-lg-4">
            <h3>Contact Info</h3>
            <p>Email: support@urbanwear.com</p>
            <p>Phone: +20 100 000 0000</p>
            <p>Location: Cairo, Egypt</p>
            <div className={styles.socials}>
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaTiktok /></a>
              <a href="#"><FaXTwitter /></a>
            </div>
          </div>
        </div>

        <div className={styles.copy}>© 2026 URBAN WEAR. All rights reserved.</div>
      </div>
    </footer>
  );
}

export default Footer;
