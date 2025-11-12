"use client";

import Link from "next/link";
import Logo from "./new/Logo";
import FooterTop from "./new/FooterTop";
import SocialMedia from "./new/SocialMedia";
import { categoriesData, quickLinksData } from "@/constants";
import { useEffect, useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/newsletter`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setEmail("");
      } else {
        setError(data.error || "Something went wrong");
      }

      // ✅ Her durumda input’u temizle
      setEmail("");
    } catch (err) {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  // 🕐 Mesajları 2 saniye sonra temizle
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess(false);
        setError(null);
      }, 2000); // 2 saniye sonra kaybolacak
      return () => clearTimeout(timer);
    }
  }, [success, error]);
  return (
    <footer className="bg-white border-t">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top section with contact info */}
        <FooterTop />

        {/* Main footer content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-gray-600 text-sm">
              Discover curated furniture collections at Betprint, blending style
              and comfort to elevate your living spaces.
            </p>
            <SocialMedia
              className="text-darkColor/60"
              iconClassName="border-darkColor/60 hover:border-shop_dark_green hover:text-shop_dark_green"
              tooltipClassName="bg-darkColor text-white"
            />
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinksData?.map((item) => (
                <li key={item?.title}>
                  <div
                    className="text-gray-600 hover:text-shop_dark_green text-sm font-medium hoverEffect"
                  >
                    {item?.title}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
            <ul className="space-y-3">
              {categoriesData.map((item) => (
                <li key={item?.title}>
                  <Link
                    href={`/category/${item?.href}`}
                    className="text-gray-600 hover:text-shop_dark_green text-sm font-medium hoverEffect capitalize"
                  >
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Newsletter</h3>
            <p className="text-gray-600 text-sm mb-4">
              Subscribe to our newsletter to receive updates and exclusive
              offers.
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-200"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
            {success && (
              <p className="text-green-600 text-sm mt-2">
                Thanks for subscribing!
              </p>
            )}
            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          </div>
        </div>

        {/* Bottom copyright section */}
        <div className="py-6 border-t text-center text-sm text-gray-600">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="text-darkColor font-black tracking-wider uppercase hover:text-shop_dark_green hoverEffect group font-sans">
              Betprin
              <span className="text-shop_dark_green group-hover:text-darkColor hoverEffect">
                t
              </span>
            </span>
            . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
