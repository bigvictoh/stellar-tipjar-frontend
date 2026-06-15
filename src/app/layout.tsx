// Root layout — minimal shell only.
// All providers, <html>, <body>, Navbar, and i18n are handled by
// src/app/[locale]/layout.tsx via next-intl locale routing.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
