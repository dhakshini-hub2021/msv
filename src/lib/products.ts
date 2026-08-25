import sambar from "@/assets/p-sambar.jpg";
import rasam from "@/assets/p-rasam.jpg";
import idli from "@/assets/p-idli.jpg";
import paruppu from "@/assets/p-paruppu.jpg";
import poondu from "@/assets/p-poondu.jpg";
import karuveppilai from "@/assets/p-karuveppilai.jpg";

export type Product = {
  id: string;
  name: string;
  weight: string;
  price: number;
  description: string;
  long: string;
  image: string;
  badge: string;
  popularity: number;
  newness: number;
};

export const products: Product[] = [
  {
    id: "sambar-powder",
    name: "Sambar Powder",
    weight: "250g",
    price: 175,
    description: "Rich, aromatic and perfect blend for traditional sambar.",
    long: "Sun-dried chillies, coriander and lentils roasted slowly and stone ground in small batches, exactly the way it is done at home. A spoonful is all you need for a fragrant, full-bodied sambar.",
    image: sambar,
    badge: "Homemade",
    popularity: 6,
    newness: 1,
  },
  {
    id: "rasam-powder",
    name: "Rasam Powder",
    weight: "250g",
    price: 190,
    description: "Tangy, spicy and flavorful rasam made easy.",
    long: "Pepper, cumin and toor dal roasted to the right shade for a rasam that is warming, tangy and comforting — perfect on rainy days and for everyday meals.",
    image: rasam,
    badge: "No Preservatives",
    popularity: 5,
    newness: 2,
  },
  {
    id: "idli-podi",
    name: "Idli Podi",
    weight: "100g",
    price: 75,
    description: "Perfect with idli, dosa and hot rice with ghee.",
    long: "Our classic milagai podi — coarse, nutty and fiery in the best way. Mix with a spoon of gingelly oil or ghee and enjoy with soft idlis.",
    image: idli,
    badge: "Homemade",
    popularity: 6,
    newness: 3,
  },
  {
    id: "paruppu-podi",
    name: "Paruppu Podi",
    weight: "100g",
    price: 80,
    description: "Healthy and protein-rich dal powder for everyday meals.",
    long: "A gentle, protein-rich dal podi that children love. Wonderful with hot rice and ghee, and a lifesaver on busy days.",
    image: paruppu,
    badge: "No Preservatives",
    popularity: 4,
    newness: 4,
  },
  {
    id: "poondu-podi",
    name: "Poondu Podi",
    weight: "100g",
    price: 90,
    description: "Spicy and flavorful garlic podi that goes well with everything.",
    long: "Fresh garlic, roasted and ground with chillies for a bold podi that lifts idli, dosa, curd rice and even toast.",
    image: poondu,
    badge: "Homemade",
    popularity: 5,
    newness: 5,
  },
  {
    id: "karuveppilai-podi",
    name: "Karuveppilai Podi",
    weight: "100g",
    price: 75,
    description: "Aromatic curry leaves podi for a healthy and tasty twist.",
    long: "Hand-picked curry leaves dried in the shade and ground with dals — deeply aromatic, iron-rich and a favourite with hot rice.",
    image: karuveppilai,
    badge: "No Preservatives",
    popularity: 4,
    newness: 6,
  },
];

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}

export const WHATSAPP_NUMBER = "918248728120";
export const PHONE_DISPLAY = "+91 82487 28120";

export const SHIPPING_FLAT = 60;
export const FREE_SHIPPING_ABOVE = 799;

export function shippingFor(subtotal: number) {
  if (subtotal === 0) return 0;
  return subtotal >= FREE_SHIPPING_ABOVE ? 0 : SHIPPING_FLAT;
}

export function inr(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}
