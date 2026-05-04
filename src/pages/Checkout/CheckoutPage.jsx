import MuiButton from "@mui/material/Button";
import { useState } from "react";
import { createAddress } from "../../api/addressApi";
import { validateCoupon } from "../../api/couponApi";
import { createOrderFromCart } from "../../api/orderApi";
import Button from "../../components/Button/Button";
import styles from "./CheckoutPage.module.css";

function CheckoutPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    title: "Home",
    details: "",
    city: "",
    postalCode: "",
    governorateId: "",
    payment: "cash",
    couponCode: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleValidateCoupon = async () => {
    if (!formData.couponCode) {
      setMessage("Enter a coupon code first.");
      return;
    }

    try {
      await validateCoupon({ code: formData.couponCode, subtotal: 0 });
      setMessage("Coupon is ready to apply during order creation.");
    } catch (error) {
      setMessage(error?.response?.data?.message || "Coupon validation failed.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const addressResponse = await createAddress({
        title: formData.title,
        details: `${formData.details}, ${formData.city}, ${formData.postalCode}`,
        governorate_id: formData.governorateId,
      });
      const addressId =
        addressResponse?.data?.data?.id || addressResponse?.data?.id || null;

      await createOrderFromCart({
        address_id: addressId,
        coupon_code: formData.couponCode || null,
        notes: formData.notes || "Please call before delivery",
      });

      setMessage("Order confirmed successfully.");
    } catch (error) {
      setMessage(
        error?.response?.data?.message ||
          "Checkout needs a logged-in customer and a valid cart.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={styles.page}>
      <div className="container">
        <div className="page-title">
          <h1>Checkout</h1>
          <p className="text-muted-store">
            Customer info, address, payment, and confirmation.
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <section>
            <h2>Customer Details</h2>
            <input
              name="fullName"
              onChange={handleChange}
              placeholder="Full name"
              type="text"
              value={formData.fullName}
            />
            <input
              name="email"
              onChange={handleChange}
              placeholder="Email address"
              type="email"
              value={formData.email}
            />
            <input
              name="phone"
              onChange={handleChange}
              placeholder="Phone number"
              type="tel"
              value={formData.phone}
            />
          </section>

          <section>
            <h2>Shipping Address</h2>
            <input
              name="title"
              onChange={handleChange}
              placeholder="Address title"
              type="text"
              value={formData.title}
            />
            <input
              name="details"
              onChange={handleChange}
              placeholder="Street address"
              type="text"
              value={formData.details}
            />
            <input
              name="city"
              onChange={handleChange}
              placeholder="City"
              type="text"
              value={formData.city}
            />
            <input
              name="postalCode"
              onChange={handleChange}
              placeholder="Postal code"
              type="text"
              value={formData.postalCode}
            />
            <input
              name="governorateId"
              onChange={handleChange}
              placeholder="Governorate ID"
              type="text"
              value={formData.governorateId}
            />
          </section>

          <section>
            <h2>Coupon</h2>
            <div className={styles.inlineGroup}>
              <input
                name="couponCode"
                onChange={handleChange}
                placeholder="Coupon code"
                type="text"
                value={formData.couponCode}
              />
              <MuiButton onClick={handleValidateCoupon} type="button">
                Validate
              </MuiButton>
            </div>
          </section>

          <section>
            <h2>Payment Method</h2>
            <label>
              <input
                checked={formData.payment === "cash"}
                name="payment"
                onChange={handleChange}
                type="radio"
                value="cash"
              />{" "}
              Cash on delivery
            </label>
            <label>
              <input
                checked={formData.payment === "card"}
                name="payment"
                onChange={handleChange}
                type="radio"
                value="card"
              />{" "}
              Credit card
            </label>
            <textarea
              name="notes"
              onChange={handleChange}
              placeholder="Order notes"
              value={formData.notes}
            ></textarea>
          </section>

          {message && <p className={styles.message}>{message}</p>}
          <Button type="submit" variant="orange">
            {isSubmitting ? "Confirming..." : "Confirm Order"}
          </Button>
        </form>
      </div>
    </main>
  );
}

export default CheckoutPage;
