import "../src/index.css";

export const metadata = {
  title: "Soul of Love - Daily Energy",
  description: "A futuristic spiritual emotional interface for daily Major Arcana energy."
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#05030f"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
