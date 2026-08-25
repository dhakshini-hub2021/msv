export type PlacedOrder = {
  orderId: string;
  createdAt: string;
  items: { name: string; weight: string; qty: number; price: number }[];
  subtotal: number;
  shipping: number;
  total: number;
  payment: "cod" | "upi";
  customer: {
    name: string;
    mobile: string;
    email: string;
    house: string;
    street: string;
    city: string;
    district: string;
    state: string;
    pincode: string;
    instructions: string;
  };
};

const KEY = "msv-last-order";

export function saveOrder(order: PlacedOrder) {
  try {
    localStorage.setItem(KEY, JSON.stringify(order));
  } catch {
    /* ignore */
  }
}

export function readOrder(): PlacedOrder | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as PlacedOrder) : null;
  } catch {
    return null;
  }
}

export function formatAddress(c: PlacedOrder["customer"]) {
  return [c.house, c.street, c.city, c.district, c.state, c.pincode]
    .filter((p) => p && p.trim())
    .join(", ");
}

export function newOrderId() {
  return `MSV${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 90 + 10)}`;
}
