import { WHATSAPP_NUMBER, inr } from "./products";

export type WhatsAppOrderInput = {
  items: { name: string; weight: string; qty: number }[];
  total: number;
  name?: string;
  address?: string;
  mobile?: string;
};

export function buildWhatsAppMessage({
  items,
  total,
  name,
  address,
  mobile,
}: WhatsAppOrderInput) {
  const lines = [
    "Hello MSV Homemade Foods,",
    "",
    "I would like to place an order.",
    "",
    "Products:",
    ...items.map((i) => `${i.name} (${i.weight}) × ${i.qty}`),
    "",
    `Total Amount: ${inr(total)}`,
    "",
    "Customer Name:",
    name?.trim() || "-",
    "",
    "Delivery Address:",
    address?.trim() || "-",
    "",
    "Mobile Number:",
    mobile?.trim() || "-",
    "",
    "Please confirm my order and delivery details.",
  ];
  return lines.join("\n");
}

export function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(input: WhatsAppOrderInput) {
  window.open(whatsappUrl(buildWhatsAppMessage(input)), "_blank", "noopener");
}

export function enquiryUrl(text = "Hello MSV Homemade Foods, I would like to know more about your podis.") {
  return whatsappUrl(text);
}
