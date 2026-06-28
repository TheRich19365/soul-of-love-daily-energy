import Script from "next/script";
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
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en">
      <body>
        {gaMeasurementId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', '${gaMeasurementId}', { send_page_view: false });
              `}
            </Script>
          </>
        ) : null}
        {children}
      </body>
    </html>
  );
}
