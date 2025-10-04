import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Wild Oasis",
  description: "The Wild Oasis, customer webpage.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
