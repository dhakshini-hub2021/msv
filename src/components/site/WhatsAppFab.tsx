import { enquiryUrl } from "@/lib/whatsapp";

export function WhatsAppFab() {
  return (
    <a
      href={enquiryUrl()}
      target="_blank"
      rel="noopener"
      aria-label="Order on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lift transition-transform hover:scale-105"
    >
      <WhatsAppIcon className="h-5 w-5" />
      <span className="hidden sm:inline">Order on WhatsApp</span>
    </a>
  );
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.66.15-.2.3-.78.96-.96 1.16-.17.2-.35.22-.65.07-.3-.15-1.12-.41-2.14-1.32-.79-.7-1.32-1.57-1.47-1.87-.15-.3-.02-.46.13-.61.15-.15.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.66-1.6-.9-2.18-.24-.58-.48-.5-.66-.5h-.56c-.2 0-.5.07-.76.37-.26.3-1 .97-1 2.37s1.02 2.75 1.17 2.95c.15.2 2.02 3.2 4.9 4.36 2.88 1.16 2.88.77 3.4.72.52-.05 1.68-.68 1.92-1.35.24-.66.24-1.23.17-1.35-.07-.12-.27-.2-.57-.35z" />
      <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.94L2 22l5.34-1.4a9.83 9.83 0 004.7 1.2h.01c5.43 0 9.84-4.4 9.84-9.84C21.89 6.4 17.48 2 12.04 2zm0 17.98h-.01a8.2 8.2 0 01-4.16-1.14l-.3-.18-3.1.81.83-3.02-.19-.31a8.13 8.13 0 01-1.25-4.3c0-4.52 3.68-8.19 8.2-8.19a8.19 8.19 0 018.17 8.2c0 4.52-3.67 8.13-8.19 8.13z" />
    </svg>
  );
}
