import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/site/WhatsAppFab";
import { Button } from "@/components/ui/button";
import { formatAddress, readOrder, type PlacedOrder } from "@/lib/order";
import { inr } from "@/lib/products";
import { buildWhatsAppMessage, enquiryUrl, whatsappUrl } from "@/lib/whatsapp";

export const Route = createFileRoute("/order-confirmation")({
  head: () => ({
    meta: [
      { title: "Order Confirmed | MSV – Authentic & Homemade" },
      {
        name: "description",
        content: "Your MSV homemade podi order has been received. We will contact you shortly to confirm.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Order Confirmed | MSV – Authentic & Homemade" },
      { property: "og:description", content: "Thank you for ordering homemade podis from MSV." },
    ],
  }),
  component: OrderConfirmation,
});

function OrderConfirmation() {
  const [order, setOrder] = useState<PlacedOrder | null>(null);

  useEffect(() => {
    setOrder(readOrder());
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="rounded-3xl border border-gold/40 bg-card p-8 text-center shadow-lift sm:p-12">
        <CheckCircle2 className="mx-auto h-14 w-14 text-primary" />
        <h1 className="mt-5 font-display text-3xl font-bold text-primary sm:text-4xl">
          Thank You for Your Order! ❤️
        </h1>
        <p className="mt-4 text-muted-foreground">
          Your order has been received successfully. We'll contact you shortly to confirm your
          order and delivery details.
        </p>

        {order && (
          <div className="mt-8 space-y-6 text-left">
            <p className="rounded-xl bg-secondary/60 px-4 py-3 text-sm">
              <span className="eyebrow">Order ID</span>
              <span className="mt-1 block font-semibold text-brown">{order.orderId}</span>
            </p>

            <div>
              <h2 className="eyebrow">Ordered Products</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {order.items.map((i) => (
                  <li key={i.name} className="flex justify-between gap-3">
                    <span>
                      {i.name}{" "}
                      <span className="text-muted-foreground">
                        ({i.weight}) × {i.qty}
                      </span>
                    </span>
                    <span className="font-medium">{inr(i.price * i.qty)}</span>
                  </li>
                ))}
              </ul>
              <span className="leaf-divider my-4" />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>{order.shipping === 0 ? "Free" : inr(order.shipping)}</span>
              </div>
              <div className="mt-2 flex justify-between text-base">
                <span className="font-semibold">Total Amount</span>
                <span className="font-bold text-brown">{inr(order.total)}</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Payment: {order.payment === "cod" ? "Cash on Delivery" : "UPI / Online Payment"}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h2 className="eyebrow">Customer Details</h2>
                <p className="mt-2 text-sm text-foreground/85">
                  {order.customer.name}
                  <br />
                  {order.customer.mobile}
                  <br />
                  {order.customer.email}
                </p>
              </div>
              <div>
                <h2 className="eyebrow">Delivery Address</h2>
                <p className="mt-2 text-sm text-foreground/85">
                  {formatAddress(order.customer)}
                </p>
                {order.customer.instructions && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    Note: {order.customer.instructions}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link to="/shop">Continue Shopping</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <a
              href={
                order
                  ? whatsappUrl(
                      buildWhatsAppMessage({
                        items: order.items,
                        total: order.total,
                        name: order.customer.name,
                        address: formatAddress(order.customer),
                        mobile: order.customer.mobile,
                      }),
                    )
                  : enquiryUrl()
              }
              target="_blank"
              rel="noopener"
            >
              <WhatsAppIcon className="mr-2 h-5 w-5" />
              Contact Us on WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
