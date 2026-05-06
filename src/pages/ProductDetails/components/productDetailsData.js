import {
  FaCreditCard,
  FaRotateLeft,
  FaRulerCombined,
  FaShieldHalved,
  FaShirt,
  FaTruckFast,
} from "react-icons/fa6";

export const fallbackSizes = ["S", "M", "L", "XL"];
export const fallbackColors = ["Black", "White", "Olive", "Cream"];

export const benefitItems = [
  {
    icon: FaTruckFast,
    title: "Fast Shipping",
    text: "Dispatch within 24 hours with clear order tracking.",
  },
  {
    icon: FaShieldHalved,
    title: "Quality Guarantee",
    text: "Every piece is checked for fit, finish, and fabric quality.",
  },
  {
    icon: FaRotateLeft,
    title: "Easy Returns",
    text: "Exchange or return eligible items within 14 days.",
  },
  {
    icon: FaCreditCard,
    title: "Secure Payment",
    text: "Safe checkout with trusted payment methods.",
  },
];

export const reviews = [
  {
    id: 1,
    name: "Mariam H.",
    rating: 5,
    date: "Apr 22, 2026",
    text: "The fit is oversized without feeling messy. Fabric feels premium after washing.",
  },
  {
    id: 2,
    name: "Omar A.",
    rating: 4,
    date: "Apr 10, 2026",
    text: "Great streetwear piece. True to size and the color looks exactly like the photos.",
  },
  {
    id: 3,
    name: "Nour S.",
    rating: 5,
    date: "Mar 28, 2026",
    text: "Arrived quickly and styled well with cargos and sneakers. Would buy again.",
  },
];

export const tabs = [
  {
    id: "description",
    label: "Description",
    icon: FaShirt,
  },
  {
    id: "specs",
    label: "Product Details",
    icon: FaRulerCombined,
  },
  {
    id: "care",
    label: "Materials & Care",
    icon: FaShieldHalved,
  },
];

export const faqItems = [
  {
    id: "delivery",
    question: "متى يصل الطلب؟",
    answer: "يتم تجهيز وشحن الطلب خلال 1 - 3 أيام عمل، ومدة الوصول تختلف حسب المحافظة وشركة الشحن.",
  },
  {
    id: "size-exchange",
    question: "إذا كان المقاس غير مناسب هل يمكن الاستبدال؟",
    answer: "نعم، يمكنك طلب الاستبدال خلال 14 يومًا بشرط أن يكون المنتج بحالته الأصلية ولم يتم استخدامه.",
  },
  {
    id: "change-order",
    question: "هل يمكنني تغيير أو إلغاء الطلب؟",
    answer: "يمكن تعديل أو إلغاء الطلب قبل تسليمه لشركة الشحن. بعد الشحن يمكن طلب استبدال أو استرجاع حسب السياسة.",
  },
  {
    id: "returns",
    question: "كيفية الاسترجاع والاستبدال؟",
    answer: "تواصل معنا برقم الطلب، وسنرتب معك خطوات الاسترجاع أو الاستبدال ومتابعة مندوب الشحن.",
  },
];
