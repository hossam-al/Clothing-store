import {
  FaBagShopping,
  FaHatCowboy,
  FaPerson,
  FaPersonDress,
  FaShirt,
} from "react-icons/fa6";
import { GiConverseShoe, GiHoodie, GiWinterGloves } from "react-icons/gi";

export const mockCategories = [
  { id: 1, name: "Men", text: "Urban staples", icon: FaPerson },
  { id: 2, name: "Women", text: "Bold everyday fits", icon: FaPersonDress },
  { id: 3, name: "Sneakers", text: "Fresh sole drops", icon: GiConverseShoe },
  { id: 4, name: "Hoodies", text: "Oversized comfort", icon: GiHoodie },
  { id: 5, name: "T-Shirts", text: "Graphic essentials", icon: FaShirt },
  { id: 6, name: "Jackets", text: "Layer-ready outerwear", icon: GiWinterGloves },
  { id: 7, name: "Accessories", text: "Details that hit", icon: FaHatCowboy },
  { id: 8, name: "Bags", text: "Carry the look", icon: FaBagShopping },
];
