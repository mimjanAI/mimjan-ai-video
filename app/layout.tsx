import type { ReactNode } from "react";

export const metadata = {
  title: "Vision Dream AI",
  description: "AI-powered video generator",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
