import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { WhatsAppIcon } from "@/components/site/WhatsAppFab";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PHONE_DISPLAY } from "@/lib/products";
import { whatsappUrl } from "@/lib/whatsapp";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact MSV – Homemade Podis, Trichy Tamil Nadu" },
      {
        name: "description",
        content:
          "Talk to MSV – Authentic & Homemade in Trichy, Tamil Nadu. Call or WhatsApp +91 82487 28120 for orders, bulk enquiries and delivery details.",
      },
      { property: "og:title", content: "Contact MSV – Homemade Podis, Trichy" },
      { property: "og:description", content: "Call or WhatsApp us for orders and bulk enquiries." },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  message: z.string().trim().min(5, "Tell us a little more").max(600),
});

function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    const text = `Hello MSV Homemade Foods,\n\n${parsed.data.message}\n\nName: ${parsed.data.name}\nPhone: ${parsed.data.phone}`;
    window.open(whatsappUrl(text), "_blank", "noopener");
    toast.success("Opening WhatsApp with your message");
    setForm({ name: "", phone: "", message: "" });
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <div className="text-center">
        <p className="eyebrow">Contact</p>
        <h1 className="mt-2 font-display text-4xl font-bold text-primary">We'd Love to Hear From You</h1>
        <p className="mt-3 text-muted-foreground">
          Orders, bulk enquiries, gifting or just a question about a podi — reach out any time.
        </p>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-gold/40 bg-card p-7 shadow-card">
          <h2 className="font-display text-2xl text-primary">MSV – Authentic &amp; Homemade</h2>
          <ul className="mt-5 space-y-4 text-sm text-foreground/85">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 text-primary" />
              <span>
                <span className="block font-semibold">Location</span>
                Trichy, Tamil Nadu
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-5 w-5 text-primary" />
              <span>
                <span className="block font-semibold">Phone</span>
                {PHONE_DISPLAY}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <WhatsAppIcon className="mt-0.5 h-5 w-5 text-primary" />
              <span>
                <span className="block font-semibold">WhatsApp</span>
                {PHONE_DISPLAY}
              </span>
            </li>
          </ul>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild>
              <a href={whatsappUrl("Hello MSV Homemade Foods, I have a question.")} target="_blank" rel="noopener">
                <WhatsAppIcon className="mr-2 h-4 w-4" />
                WhatsApp Us
              </a>
            </Button>
            <Button asChild variant="outline" className="border-brown/40 text-brown">
              <a href="tel:+918248728120">Call Us</a>
            </Button>
          </div>
        </div>

        <form onSubmit={submit} className="rounded-2xl border border-border bg-card p-7 shadow-card">
          <h2 className="font-display text-2xl text-primary">Send a Message</h2>
          <div className="mt-5 space-y-4">
            <div>
              <Label htmlFor="c-name">Name</Label>
              <Input
                id="c-name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="mt-1.5"
              />
              {errors["name"] && <p className="mt-1 text-xs text-destructive">{errors["name"]}</p>}
            </div>
            <div>
              <Label htmlFor="c-phone">Phone</Label>
              <Input
                id="c-phone"
                type="tel"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                className="mt-1.5"
              />
              {errors["phone"] && <p className="mt-1 text-xs text-destructive">{errors["phone"]}</p>}
            </div>
            <div>
              <Label htmlFor="c-message">Message</Label>
              <Textarea
                id="c-message"
                rows={5}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                className="mt-1.5"
              />
              {errors["message"] && (
                <p className="mt-1 text-xs text-destructive">{errors["message"]}</p>
              )}
            </div>
            <Button type="submit" size="lg" className="w-full">
              Send Message
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
