import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { WhatsAppIcon } from "@/components/site/WhatsAppFab";
import { Button } from "@/components/ui/button";
import { QtyStepper } from "@/components/site/ProductCard";
import { useCart } from "@/lib/cart";
import { FREE_SHIPPING_ABOVE, inr } from "@/lib/products";
import { openWhatsApp } from "@/lib/whatsapp";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart | MSV – Authentic & Homemade" },
      {
        name: "description",
        content: "Review your MSV homemade podi order, update quantities and checkout or order on WhatsApp.",
      },
      { property: "og:title", content: "Your Cart | MSV – Authentic & Homemade" },
      { property: "og:description", content: "Review your homemade podi order and check out." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { detailed, subtotal, shipping, total, setQty, remove } = useCart();

  if (detailed.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-bold text-primary">Your cart is empty</h1>
        <p className="mt-3 text-muted-foreground">
          Add a podi or two — they travel well and last long.
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link to="/shop">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-display text-4xl font-bold text-primary">Your Cart</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-4">
          {detailed.map(({ product, qty, total: lineTotal }) => (
            <div
              key={product.id}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 shadow-card sm:flex-row sm:items-center"
            >
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                width={900}
                height={900}
                className="h-24 w-24 rounded-xl object-cover"
              />
              <div className="flex-1">
                <h2 className="font-display text-xl text-primary">{product.name}</h2>
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {product.weight} • {inr(product.price)}
                </p>
              </div>
              <QtyStepper qty={qty} setQty={(n) => setQty(product.id, n)} />
              <div className="flex items-center gap-4 sm:w-28 sm:justify-end">
                <span className="font-semibold text-brown">{inr(lineTotal)}</span>
                <button
                  aria-label={`Remove ${product.name}`}
                  onClick={() => remove(product.id)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <aside className="h-fit rounded-2xl border border-gold/40 bg-card p-6 shadow-card">
          <h2 className="font-display text-2xl text-primary">Order Summary</h2>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd className="font-medium">{inr(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd className="font-medium">{shipping === 0 ? "Free" : inr(shipping)}</dd>
            </div>
            <span className="leaf-divider" />
            <div className="flex justify-between text-base">
              <dt className="font-semibold">Total</dt>
              <dd className="font-bold text-brown">{inr(total)}</dd>
            </div>
          </dl>
          {shipping > 0 && (
            <p className="mt-3 text-xs text-muted-foreground">
              Free shipping on orders above {inr(FREE_SHIPPING_ABOVE)}.
            </p>
          )}

          <div className="mt-6 space-y-3">
            <Button asChild size="lg" className="w-full">
              <Link to="/checkout">Proceed to Checkout</Link>
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="w-full"
              onClick={() =>
                openWhatsApp({
                  items: detailed.map((d) => ({
                    name: d.product.name,
                    weight: d.product.weight,
                    qty: d.qty,
                  })),
                  total,
                })
              }
            >
              <WhatsAppIcon className="mr-2 h-5 w-5" />
              Order on WhatsApp
            </Button>
            <Button asChild variant="outline" className="w-full border-brown/40 text-brown">
              <Link to="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
