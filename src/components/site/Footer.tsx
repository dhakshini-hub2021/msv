import { Link } from "@tanstack/react-router";
import { MapPin, Phone } from "lucide-react";
import logo from "@/assets/msv-logo.jpeg.asset.json";
import { PHONE_DISPLAY } from "@/lib/products";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-secondary/50">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={logo.url}
              alt="MSV logo"
              loading="lazy"
              width={56}
              height={56}
              className="h-14 w-14 rounded-full object-cover ring-1 ring-gold/60"
            />
            <div>
              <p className="font-display text-2xl font-bold text-primary">MSV</p>
              <p className="text-[0.65rem] uppercase tracking-[0.2em] text-brown">
                Authentic &amp; Homemade
              </p>
            </div>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Homemade with Love, Packed with Goodness. Traditional Flavors • Premium
            Ingredients • No Preservatives
          </p>
        </div>

        <div>
          <h3 className="eyebrow">Explore</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              { to: "/shop", label: "Shop All Podis" },
              { to: "/about", label: "Our Story" },
              { to: "/contact", label: "Contact Us" },
              { to: "/cart", label: "Your Cart" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-foreground/80 hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="eyebrow">Reach Us</h3>
          <ul className="mt-4 space-y-3 text-sm text-foreground/85">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 text-primary" /> Trichy, Tamil Nadu
            </li>
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 text-primary" />
              <a href="tel:+918248728120">{PHONE_DISPLAY}</a>
            </li>
          </ul>
          <p className="mt-6 text-xs text-muted-foreground">
            Pan India delivery • Small batch production
          </p>
        </div>
      </div>
      <div className="border-t border-border/70 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} MSV – Authentic &amp; Homemade, Trichy.
      </div>
    </footer>
  );
}
