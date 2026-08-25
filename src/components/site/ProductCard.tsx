import { Link, useNavigate } from "@tanstack/react-router";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { inr, type Product } from "@/lib/products";
import { openWhatsApp } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./WhatsAppFab";

export function QtyStepper({
  qty,
  setQty,
}: {
  qty: number;
  setQty: (n: number) => void;
}) {
  return (
    <div className="flex items-center rounded-full border border-border bg-card">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => setQty(Math.max(1, qty - 1))}
        className="grid h-9 w-9 place-items-center rounded-full text-brown hover:bg-secondary"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="w-8 text-center text-sm font-semibold">{qty}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => setQty(qty + 1)}
        className="grid h-9 w-9 place-items-center rounded-full text-brown hover:bg-secondary"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const { add } = useCart();
  const navigate = useNavigate();

  return (
    <article className="group overflow-hidden rounded-3xl border border-border bg-card shadow-card transition-shadow hover:shadow-lift">
      <Link
        to="/product/$productId"
        params={{ productId: product.id }}
        className="relative block overflow-hidden"
      >
        <img
          src={product.image}
          alt={`${product.name} — homemade South Indian podi`}
          loading="lazy"
          width={900}
          height={900}
          className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-primary/95 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-widest text-primary-foreground">
          {product.badge}
        </span>
      </Link>

      <div className="space-y-3 p-5">
        <div>
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-display text-xl font-semibold text-primary">
              <Link to="/product/$productId" params={{ productId: product.id }}>
                {product.name}
              </Link>
            </h3>
            <span className="text-lg font-bold text-brown">{inr(product.price)}</span>
          </div>
          <p className="mt-0.5 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {product.weight}
          </p>
        </div>
        <p className="text-sm text-muted-foreground">{product.description}</p>

        <div className="flex items-center justify-between gap-3 pt-1">
          <QtyStepper qty={qty} setQty={setQty} />
          <Button
            className="flex-1"
            onClick={() => {
              add(product.id, qty);
              toast.success(`${product.name} added to cart`);
            }}
          >
            Add to Cart
          </Button>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1 border-brown/40 text-brown hover:bg-secondary"
            onClick={() => {
              add(product.id, qty);
              navigate({ to: "/checkout" });
            }}
          >
            Buy Now
          </Button>
          <Button
            variant="secondary"
            aria-label={`Order ${product.name} on WhatsApp`}
            onClick={() =>
              openWhatsApp({
                items: [{ name: product.name, weight: product.weight, qty }],
                total: product.price * qty,
              })
            }
          >
            <WhatsAppIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </article>
  );
}
