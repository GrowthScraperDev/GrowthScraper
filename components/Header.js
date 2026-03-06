"use client";

import { Menu, X } from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when drawer opens
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <header className="w-full px-[20px] sm:px-[40px] xl:px-[80px]">
        <div className="w-full">

          {/* Desktop Header (UNCHANGED) */}
          <div className="hidden lg:flex items-center justify-between bg-white rounded-md py-4">
            <div className="flex items-center gap-2">
              <img src="/growth-scraper-logo.svg" alt="logo" className="w-[182px] h-10" />
            </div>

            <nav className="flex items-center gap-10 text-gray-600 font-medium">
              <Link href="#">Solutions</Link>
              <Link href="#">Academy</Link>
              <Link href="#">About</Link>
              <Link href="#">Case Studies</Link>
              <Link href="#">Contact</Link>
            </nav>

            <button className="bg-[#084734] text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition">
              Lets Collaborate
            </button>
          </div>

          {/* Mobile Header (UNCHANGED) */}
          <div className="lg:hidden flex items-center justify-between bg-white rounded-md py-4">
            <img src="/growth-scraper-logo.svg" alt="logo" className="w-[150px] h-10" />

            <div className="flex items-center gap-4">
              <button className="bg-[#084734] text-white px-5 py-2 rounded-full text-sm font-medium">
                Lets Collaborate
              </button>

              <button onClick={() => setIsOpen(true)}>
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ================= DRAWER ================= */}

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[320px] bg-white z-50 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-6">
          <button onClick={() => setIsOpen(false)}>
            <X className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Drawer Links */}
        <div className="px-6 flex flex-col gap-6 text-gray-700 font-medium">
          <Link href="#" onClick={() => setIsOpen(false)}>Solutions</Link>
          <Link href="#" onClick={() => setIsOpen(false)}>Academy</Link>
          <Link href="#" onClick={() => setIsOpen(false)}>About</Link>
          <Link href="#" onClick={() => setIsOpen(false)}>Case Studies</Link>
          <Link href="#" onClick={() => setIsOpen(false)}>Contact</Link>
        </div>

        {/* Bottom CTA */}
        {/* <div className="absolute bottom-8 left-6 right-6">
          <button className="w-full bg-[#084734] text-white py-3 rounded-full font-medium">
            Lets Collaborate
          </button>
        </div> */}
      </div>
    </>
  );
}