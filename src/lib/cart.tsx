import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products, shippingFor, type Product } from "./products";

export type CartLine = { id: string; qty: number };

type CartContextValue = {
  lines: CartLine[];
  detailed: { product: Product; qty: number; total: number }[];
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  add: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const KEY = "msv-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setLines(parsed.filter((l) => l && l.id));
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines, hydrated]);

  const value = useMemo<CartContextValue>(() => {
    const detailed = lines
      .map((l) => {
        const product = products.find((p) => p.id === l.id);
        if (!product) return null;
        return { product, qty: l.qty, total: product.price * l.qty };
      })
      .filter(Boolean) as { product: Product; qty: number; total: number }[];

    const subtotal = detailed.reduce((s, d) => s + d.total, 0);
    const shipping = shippingFor(subtotal);

    return {
      lines,
      detailed,
      count: detailed.reduce((s, d) => s + d.qty, 0),
      subtotal,
      shipping,
      total: subtotal + shipping,
      add: (id, qty = 1) =>
        setLines((prev) => {
          const found = prev.find((l) => l.id === id);
          if (found)
            return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l));
          return [...prev, { id, qty }];
        }),
      setQty: (id, qty) =>
        setLines((prev) =>
          qty <= 0
            ? prev.filter((l) => l.id !== id)
            : prev.map((l) => (l.id === id ? { ...l, qty } : l)),
        ),
      remove: (id) => setLines((prev) => prev.filter((l) => l.id !== id)),
      clear: () => setLines([]),
    };
  }, [lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
