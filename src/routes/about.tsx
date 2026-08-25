import { createFileRoute, Link } from "@tanstack/react-router";
import { Leaf, PackageCheck, ShieldCheck, Sparkles } from "lucide-react";
import kitchen from "@/assets/about-kitchen.jpg";
import hero from "@/assets/hero-spices.jpg";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story – From Our Kitchen to Yours | MSV" },
      {
        name: "description",
        content:
          "MSV is a small-batch homemade podi brand from Trichy, Tamil Nadu — traditional recipes, premium ingredients, stone-ground methods and no preservatives.",
      },
      { property: "og:title", content: "Our Story – From Our Kitchen to Yours | MSV" },
      {
        property: "og:description",
        content: "Traditional taste, premium ingredients, small batch preparation, no preservatives.",
      },
    ],
  }),
  component: About,
});

const highlights = [
  { icon: Sparkles, title: "Traditional Taste", text: "Family recipes followed exactly, batch after batch." },
  { icon: Leaf, title: "Premium Ingredients", text: "Sun-dried chillies, fresh dals and hand-picked curry leaves." },
  { icon: PackageCheck, title: "Small Batch Preparation", text: "Ground in small quantities so nothing sits on a shelf." },
  { icon: ShieldCheck, title: "No Preservatives", text: "No colours, no additives, no fillers. Ever." },
];

function About() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">About MSV</p>
            <h1 className="mt-3 font-display text-4xl font-bold text-primary sm:text-5xl">
              From Our Kitchen to Yours
            </h1>
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>
                MSV began the way most good things in a Tamil home begin — with a request for
                “just a little of your podi”. What started as jars packed for family and
                neighbours in Trichy has grown into a small kitchen that ships across India,
                without changing a single step of the process.
              </p>
              <p>
                We buy our chillies, coriander, dals and curry leaves in small quantities so
                they are always fresh. Everything is cleaned by hand, roasted slowly on low
                flame, cooled completely and then stone ground — the slower method that keeps
                the oils and aroma inside the spice instead of burning them away.
              </p>
              <p>
                Nothing is mass-produced and nothing is stored for months. Each order is packed
                from a recent batch, sealed the same week, and sent with the same care we would
                give a jar meant for our own table. That is the whole promise: homemade with
                love, packed with goodness.
              </p>
            </div>
            <Button asChild size="lg" className="mt-8">
              <Link to="/shop">Shop Our Podis</Link>
            </Button>
          </div>
          <div className="space-y-4">
            <div className="overflow-hidden rounded-3xl border border-gold/40 shadow-lift">
              <img
                src={kitchen}
                alt="Spices being ground traditionally in a Trichy home kitchen"
                width={1200}
                height={900}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-3xl border border-gold/40 shadow-card">
              <img
                src={hero}
                alt="Freshly ground South Indian spice powders in brass bowls"
                loading="lazy"
                width={1600}
                height={1200}
                className="aspect-[16/9] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary/45 py-14">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h) => (
            <div key={h.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <h.icon className="h-6 w-6 text-primary" />
              <h2 className="mt-4 font-display text-xl text-primary">{h.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{h.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
