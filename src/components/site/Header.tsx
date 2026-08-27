import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/msv-logo.jpeg.asset.json";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    setSearchOpen(false);
    setOpen(false);
    navigate({ to: "/shop", search: { q: q.trim() || undefined } });
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:h-20">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo.url}
            alt="MSV Authentic & Homemade logo"
            width={48}
            height={48}
            className="h-11 w-11 shrink-0 rounded-full object-contain ring-1 ring-gold/60 sm:h-12 sm:w-12"
          />
          <span className="leading-none">
            <span className="block font-display text-xl font-bold tracking-wide text-primary sm:text-2xl">
              MSV
            </span>
            <span className="block text-[0.6rem] uppercase tracking-[0.2em] text-brown">
              Authentic &amp; Homemade
            </span>
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
              activeProps={{ className: "text-primary font-semibold" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1 md:ml-4">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Search products"
            onClick={() => setSearchOpen((s) => !s)}
          >
            <Search className="h-5 w-5" />
          </Button>
          <Link to="/cart" aria-label="Cart" className="relative">
            <Button variant="ghost" size="icon" aria-hidden>
              <ShoppingBag className="h-5 w-5" />
            </Button>
            {count > 0 && (
              <span className="pointer-events-none absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-spice px-1 text-[0.65rem] font-bold text-primary-foreground">
                {count}
              </span>
            )}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Menu"
            onClick={() => setOpen((s) => !s)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {searchOpen && (
        <form onSubmit={submitSearch} className="border-t border-border/70 bg-secondary/40 px-4 py-3">
          <div className="mx-auto flex max-w-6xl gap-2">
            <Input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search sambar, rasam, idli podi…"
              className="bg-card"
            />
            <Button type="submit">Search</Button>
          </div>
        </form>
      )}

      {open && (
        <nav className="border-t border-border/70 bg-card px-4 py-3 md:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block rounded-md px-2 py-3 text-sm font-medium text-foreground/85 hover:bg-secondary"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
