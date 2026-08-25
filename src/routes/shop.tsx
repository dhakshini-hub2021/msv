import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/site/ProductCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { products } from "@/lib/products";

type Search = { q?: string | undefined };

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    q: typeof search["q"] === "string" ? search["q"] : undefined,
  }),

  head: () => ({
    meta: [
      { title: "Shop Homemade Podis & Spice Powders | MSV" },
      {
        name: "description",
        content:
          "Buy MSV homemade sambar powder, rasam powder, idli podi, paruppu podi, poondu podi and karuveppilai podi. Small batch, no preservatives, pan India delivery.",
      },
      { property: "og:title", content: "Shop Homemade Podis & Spice Powders | MSV" },
      {
        property: "og:description",
        content: "Six traditional South Indian podis, ground fresh in small batches in Trichy.",
      },
    ],
  }),
  component: Shop,
});

type Sort = "popular" | "newest" | "low" | "high";

function Shop() {
  const { q } = Route.useSearch();
  const [query, setQuery] = useState(q ?? "");
  const [sort, setSort] = useState<Sort>("popular");

  const list = useMemo(() => {
    const term = query.trim().toLowerCase();
    const filtered = term
      ? products.filter(
          (p) =>
            p.name.toLowerCase().includes(term) ||
            p.description.toLowerCase().includes(term),
        )
      : products.slice();
    return filtered.sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      if (sort === "newest") return b.newness - a.newness;
      return b.popularity - a.popularity;
    });
  }, [query, sort]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="text-center">
        <p className="eyebrow">Shop</p>
        <h1 className="mt-2 font-display text-4xl font-bold text-primary">
          Our Homemade Podi Collection
        </h1>
        <p className="mt-3 text-muted-foreground">
          Traditional Flavors • Premium Ingredients • No Preservatives
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-card sm:flex-row sm:items-center">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search sambar, rasam, idli podi, poondu…"
          className="sm:flex-1"
        />
        <Select value={sort} onValueChange={(v) => setSort(v as Sort)}>
          <SelectTrigger className="sm:w-56">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popular">Popular</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="low">Price: Low to High</SelectItem>
            <SelectItem value="high">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {list.length === 0 ? (
        <p className="mt-16 text-center text-muted-foreground">
          No podis matched “{query}”. Try sambar, rasam or podi.
        </p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
