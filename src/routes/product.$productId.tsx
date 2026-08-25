import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { Leaf, ShieldCheck, Truck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { QtyStepper } from "@/components/site/ProductCard";
import { WhatsAppIcon } from "@/components/site/WhatsAppFab";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { getProduct, inr, products } from "@/lib/products";
import { openWhatsApp } from "@/lib/whatsapp";

export const Route = createFileRoute("/product/$productId")({
  loader: ({ params }) => {
    const product = getProduct(params.productId);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Product unavailable | MSV" }, { name: "robots", content: "noindex" }],
      };
    }
    const { product } = loaderData;
    const title = `${product.name} ${product.weight} – Homemade | MSV`;
    return {
      meta: [
        { title },
        { name: "description", content: product.description },
        { property: "og:title", content: title },
        { property: "og:description", content: product.description },
      ],
    };
  },
  component: ProductDetails,
});

function ProductDetails() {
  const { product } = Route.useLoaderData();
  const [qty, setQty] = useState(1);
  const { add } = useCart();
  const navigate = useNavigate();
  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <nav className="text-xs text-muted-foreground">
        <Link to="/" className="hover:text-primary">
          Home
        </Link>{" "}
        /{" "}
        <Link to="/shop" className="hover:text-primary">
          Shop
        </Link>{" "}
        / <span className="text-foreground/80">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-3xl border border-gold/40 shadow-lift">
          <img
            src={product.image}
            alt={`${product.name} homemade podi in a brass bowl`}
            width={900}
            height={900}
            className="aspect-square w-full object-cover"
          />
        </div>

        <div>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-widest text-primary">
            {product.badge}
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold text-primary">{product.name}</h1>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Net weight {product.weight}
          </p>
          <p className="mt-4 text-3xl font-bold text-brown">{inr(product.price)}</p>
          <p className="mt-5 text-muted-foreground">{product.long}</p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <QtyStepper qty={qty} setQty={setQty} />
            <Button
              size="lg"
              onClick={() => {
                add(product.id, qty);
                toast.success(`${product.name} added to cart`);
              }}
            >
              Add to Cart
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-brown/40 text-brown"
              onClick={() => {
                add(product.id, qty);
                navigate({ to: "/checkout" });
              }}
            >
              Buy Now
            </Button>
          </div>

          <Button
            variant="secondary"
            size="lg"
            className="mt-3 w-full sm:w-auto"
            onClick={() =>
              openWhatsApp({
                items: [{ name: product.name, weight: product.weight, qty }],
                total: product.price * qty,
              })
            }
          >
            <WhatsAppIcon className="mr-2 h-5 w-5" />
            Order on WhatsApp
          </Button>

          <ul className="mt-8 grid gap-3 text-sm text-foreground/85 sm:grid-cols-3">
            <li className="flex items-center gap-2">
              <Leaf className="h-4 w-4 text-primary" /> 100% Natural
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" /> No Preservatives
            </li>
            <li className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-primary" /> Pan India Delivery
            </li>
          </ul>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="font-display text-2xl font-bold text-primary">You may also like</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {related.map((p) => (
            <Link
              key={p.id}
              to="/product/$productId"
              params={{ productId: p.id }}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-card"
            >
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
                width={900}
                height={900}
                className="aspect-square w-full object-cover"
              />
              <div className="flex items-center justify-between p-4">
                <span className="font-display text-lg text-primary">{p.name}</span>
                <span className="font-semibold text-brown">{inr(p.price)}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
