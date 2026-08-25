import { createFileRoute, Link } from "@tanstack/react-router";
import { Leaf, PackageCheck, Sparkles, Truck, Wheat, ShieldCheck } from "lucide-react";
import hero from "@/assets/hero-spices.jpg";
import kitchen from "@/assets/about-kitchen.jpg";
import logo from "@/assets/msv-logo.jpeg.asset.json";
import { ProductCard } from "@/components/site/ProductCard";
import { WhatsAppIcon } from "@/components/site/WhatsAppFab";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/products";
import { enquiryUrl } from "@/lib/whatsapp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MSV – Authentic & Homemade South Indian Podis | Trichy" },
      {
        name: "description",
        content:
          "Small-batch homemade South Indian podi and spice powders from Trichy. Sambar, rasam, idli, paruppu, poondu and karuveppilai podi. No preservatives, delivered across India.",
      },
      { property: "og:title", content: "MSV – Authentic & Homemade South Indian Podis" },
      {
        property: "og:description",
        content:
          "Traditional South Indian flavors made in small batches with premium ingredients. Order online or on WhatsApp.",
      },
    ],
  }),
  component: Home,
});

const trust = [
  { icon: Leaf, label: "100% Natural" },
  { icon: ShieldCheck, label: "No Preservatives" },
  { icon: Wheat, label: "Handpicked Ingredients" },
  { icon: Sparkles, label: "Traditional Stone Ground" },
  { icon: PackageCheck, label: "Made in Small Batches" },
  { icon: Truck, label: "Delivery Across India" },
];

function Home() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <img
              src={logo.url}
              alt="MSV Authentic & Homemade brand seal"
              width={120}
              height={120}
              className="h-24 w-24 rounded-full object-cover ring-2 ring-gold/60 sm:h-28 sm:w-28"
            />
            <p className="eyebrow mt-6">Pure Taste — From Our Kitchen to Yours</p>
            <h1 className="mt-3 font-display text-4xl font-bold leading-tight text-primary sm:text-5xl">
              Authentic Homemade Taste, Delivered to Your Door
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
              Traditional South Indian flavors made with carefully selected ingredients,
              prepared in small batches with love.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/shop">Shop Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary/40 text-primary">
                <a href={enquiryUrl()} target="_blank" rel="noopener">
                  <WhatsAppIcon className="mr-2 h-5 w-5" />
                  Order on WhatsApp
                </a>
              </Button>
            </div>
            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-brown">
              Traditional Flavors • Premium Ingredients • No Preservatives
            </p>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] border border-gold/40 shadow-lift">
              <img
                src={hero}
                alt="Brass bowls of freshly ground South Indian spice powders with chillies and curry leaves"
                width={1600}
                height={1200}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 left-4 hidden w-44 overflow-hidden rounded-2xl border border-gold/40 bg-card shadow-card sm:block">
              <img
                src={kitchen}
                alt="Spices being stone ground in a home kitchen"
                loading="lazy"
                width={1200}
                height={900}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary/45 py-10">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 sm:grid-cols-3 lg:grid-cols-6">
          {trust.map((t) => (
            <div key={t.label} className="flex flex-col items-center gap-2 text-center">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-card text-primary shadow-card">
                <t.icon className="h-5 w-5" />
              </span>
              <span className="text-xs font-semibold text-foreground/85">{t.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="text-center">
          <p className="eyebrow">Our Podis</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-primary sm:text-4xl">
            Homemade with Love, Packed with Goodness
          </h2>
          <span className="leaf-divider mx-auto mt-5 w-40" />
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-4">
        <div className="grid items-center gap-8 rounded-3xl border border-gold/40 bg-card p-6 shadow-card sm:p-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl">
            <img
              src={kitchen}
              alt="Traditional stone grinding of spices"
              loading="lazy"
              width={1200}
              height={900}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div>
            <p className="eyebrow">Our Story</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-primary">
              From Our Kitchen to Yours
            </h2>
            <p className="mt-4 text-muted-foreground">
              Every batch of MSV podi is roasted, cooled and ground at home in Trichy — no
              machines running through the night, no preservatives, no shortcuts. Just the
              taste you remember from your grandmother's kitchen.
            </p>
            <Button asChild variant="outline" className="mt-6 border-brown/40 text-brown">
              <Link to="/about">Read Our Story</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
