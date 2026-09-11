import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import Loader from "@/components/ui/Loader";
import ThemeProvider from "@/components/providers/ThemeProvider";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import AIHotelAssistant from "@/components/ui/AIHotelAssistant";
import { site } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.themaharana.com"),
  title: "The Maharana | Heritage Luxury Hotel in Ahmedabad",
  description:
    "Discover The Maharana, a heritage luxury hotel in Ahmedabad blending timeless architecture, Indian hospitality and contemporary comfort.",
  openGraph: {
    title: "The Maharana | Heritage Luxury Hotel in Ahmedabad",
    description:
      "Discover The Maharana, a heritage luxury hotel in Ahmedabad blending timeless architecture, Indian hospitality and contemporary comfort.",
    url: "https://www.themaharana.com",
    siteName: "The Maharana",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Maharana | Heritage Luxury Hotel in Ahmedabad",
    description:
      "Discover The Maharana, a heritage luxury hotel in Ahmedabad blending timeless architecture, Indian hospitality and contemporary comfort.",
  },
  alternates: { canonical: "/" },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  name: site.name,
  description: "A heritage luxury hotel in Ahmedabad, Gujarat, India.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Bhadra Fort Road",
    addressLocality: site.city,
    addressRegion: site.state,
    addressCountry: "IN",
  },
  telephone: site.phone,
  email: site.email,
  priceRange: "₹₹₹₹",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Manrope:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-ink text-parchment">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <ThemeProvider>
          <Loader />
          <CustomCursor />
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
          <AIHotelAssistant />
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  );
}