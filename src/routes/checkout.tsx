import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { WhatsAppIcon } from "@/components/site/WhatsAppFab";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/lib/cart";
import { inr } from "@/lib/products";
import { formatAddress, newOrderId, saveOrder, type PlacedOrder } from "@/lib/order";
import { openWhatsApp } from "@/lib/whatsapp";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout | MSV – Authentic & Homemade" },
      {
        name: "description",
        content:
          "Complete your MSV homemade podi order with cash on delivery or UPI. Pan India delivery from Trichy, Tamil Nadu.",
      },
      { property: "og:title", content: "Checkout | MSV – Authentic & Homemade" },
      { property: "og:description", content: "Complete your homemade podi order — COD or UPI." },
    ],
  }),
  component: Checkout,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  mobile: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  email: z.string().trim().email("Enter a valid email").max(120),
  house: z.string().trim().min(1, "House / Door No. is required").max(80),
  street: z.string().trim().min(2, "Street / Area is required").max(120),
  city: z.string().trim().min(2, "City is required").max(80),
  district: z.string().trim().min(2, "District is required").max(80),
  state: z.string().trim().min(2, "State is required").max(80),
  pincode: z.string().trim().regex(/^\d{6}$/, "Enter a valid 6-digit pincode"),
  instructions: z.string().trim().max(300).optional(),
});

const empty = {
  name: "",
  mobile: "",
  email: "",
  house: "",
  street: "",
  city: "",
  district: "",
  state: "Tamil Nadu",
  pincode: "",
  instructions: "",
};

function Checkout() {
  const { detailed, subtotal, shipping, total, clear } = useCart();
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [payment, setPayment] = useState<"cod" | "upi">("cod");
  const navigate = useNavigate();

  function set(key: keyof typeof empty, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  if (detailed.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-bold text-primary">Nothing to check out</h1>
        <p className="mt-3 text-muted-foreground">Your cart is empty right now.</p>
        <Button asChild size="lg" className="mt-8">
          <Link to="/shop">Browse Podis</Link>
        </Button>
      </div>
    );
  }

  function placeOrder(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      toast.error("Please check the highlighted fields");
      return;
    }
    setErrors({});
    const order: PlacedOrder = {
      orderId: newOrderId(),
      createdAt: new Date().toISOString(),
      items: detailed.map((d) => ({
        name: d.product.name,
        weight: d.product.weight,
        qty: d.qty,
        price: d.product.price,
      })),
      subtotal,
      shipping,
      total,
      payment,
      customer: { ...parsed.data, instructions: parsed.data.instructions ?? "" },
    };
    saveOrder(order);
    clear();
    navigate({ to: "/order-confirmation" });
  }

  const fields: { key: keyof typeof empty; label: string; type?: string; span?: boolean }[] = [
    { key: "name", label: "Customer Name", span: true },
    { key: "mobile", label: "Mobile Number", type: "tel" },
    { key: "email", label: "Email Address", type: "email" },
    { key: "house", label: "House / Door No." },
    { key: "street", label: "Street / Area" },
    { key: "city", label: "City" },
    { key: "district", label: "District" },
    { key: "state", label: "State" },
    { key: "pincode", label: "Pincode" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-display text-4xl font-bold text-primary">Checkout</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Pan India Delivery • We call to confirm every order before dispatch.
      </p>

      <form onSubmit={placeOrder} className="mt-8 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h2 className="font-display text-2xl text-primary">Delivery Details</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {fields.map((f) => (
                <div key={f.key} className={f.span ? "sm:col-span-2" : undefined}>
                  <Label htmlFor={f.key}>{f.label}</Label>
                  <Input
                    id={f.key}
                    type={f.type ?? "text"}
                    value={form[f.key]}
                    onChange={(e) => set(f.key, e.target.value)}
                    className="mt-1.5"
                  />
                  {errors[f.key] && (
                    <p className="mt-1 text-xs text-destructive">{errors[f.key]}</p>
                  )}
                </div>
              ))}
              <div className="sm:col-span-2">
                <Label htmlFor="instructions">Delivery Instructions</Label>
                <Textarea
                  id="instructions"
                  value={form.instructions}
                  onChange={(e) => set("instructions", e.target.value)}
                  placeholder="Landmark, preferred delivery time, etc."
                  className="mt-1.5"
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h2 className="font-display text-2xl text-primary">Payment Method</h2>
            <RadioGroup
              value={payment}
              onValueChange={(v) => setPayment(v as "cod" | "upi")}
              className="mt-4 space-y-3"
            >
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-border p-4 hover:bg-secondary/50">
                <RadioGroupItem value="cod" id="cod" />
                <span>
                  <span className="block text-sm font-semibold">Cash on Delivery</span>
                  <span className="block text-xs text-muted-foreground">
                    Pay when your parcel arrives.
                  </span>
                </span>
              </label>
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-border p-4 hover:bg-secondary/50">
                <RadioGroupItem value="upi" id="upi" />
                <span>
                  <span className="block text-sm font-semibold">UPI / Online Payment</span>
                  <span className="block text-xs text-muted-foreground">
                    We share the UPI details on WhatsApp after confirmation.
                  </span>
                </span>
              </label>
            </RadioGroup>
          </div>
        </div>

        <aside className="h-fit rounded-2xl border border-gold/40 bg-card p-6 shadow-card">
          <h2 className="font-display text-2xl text-primary">Order Summary</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {detailed.map((d) => (
              <li key={d.product.id} className="flex justify-between gap-3">
                <span className="text-foreground/85">
                  {d.product.name}{" "}
                  <span className="text-muted-foreground">
                    ({d.product.weight}) × {d.qty}
                  </span>
                </span>
                <span className="font-medium">{inr(d.total)}</span>
              </li>
            ))}
          </ul>
          <span className="leaf-divider my-4" />
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd>{inr(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd>{shipping === 0 ? "Free" : inr(shipping)}</dd>
            </div>
            <div className="flex justify-between pt-2 text-base">
              <dt className="font-semibold">Grand Total</dt>
              <dd className="font-bold text-brown">{inr(total)}</dd>
            </div>
          </dl>

          <Button type="submit" size="lg" className="mt-6 w-full">
            Place Order
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="lg"
            className="mt-3 w-full"
            onClick={() =>
              openWhatsApp({
                items: detailed.map((d) => ({
                  name: d.product.name,
                  weight: d.product.weight,
                  qty: d.qty,
                })),
                total,
                name: form.name,
                address: formatAddress({ ...form, instructions: form.instructions }),
                mobile: form.mobile,
              })
            }
          >
            <WhatsAppIcon className="mr-2 h-5 w-5" />
            Order on WhatsApp
          </Button>
        </aside>
      </form>
    </div>
  );
}
