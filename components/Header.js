"use client";

import { Menu, X, ChevronDown } from "lucide-react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(false);

  // Lock body scroll when drawer opens
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [isOpen]);

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <header className="w-full px-[20px] sm:px-[40px] xl:px-[80px]">
        <div className="w-full">

          {/* ================= DESKTOP ================= */}
          <div className="hidden lg:flex items-center justify-between bg-white rounded-md py-4 relative">

            {/* Logo */}
            <Link href="/">
              <img src="/growth-scraper-logo.svg" className="w-[182px] h-10" />
            </Link>

            {/* Nav */}
            <nav className="flex items-center gap-10 text-gray-600 font-medium">
              <Link href="/solutions/">Solutions</Link>

              {/* SOLUTIONS DROPDOWN */}
              <div className="relative group">
                <Link href="/academy/" className="flex items-center gap-1 cursor-pointer">
                  Academy <ChevronDown size={16} />
                </Link>

                {/* Dropdown */}
                <div className="absolute left-0 top-full mt-2 w-[400px] bg-white shadow-xl rounded-xl p-6 
                  opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                  transition-all duration-200 z-50">

                  <div className="flex flex-col gap-5">

                    <Link href="/academy/seo-mastery-program/" className="flex items-center gap-3">
                      <div>
                        <Image src="/seo-search-engine.svg" width={56} height={56} />
                      </div>
                      <div>
                        <p className="text-[16px] leading-[20px] text-black">SEO Mastery</p>
                        <p className="text-[14px] leading-[18px] text-[#595959]">
                          Improve your website visibility
                        </p>
                      </div>
                    </Link>

                    <Link href="/academy/no-code-ai-website-mastery-program/" className="flex items-center gap-3">
                      <div>
                        <Image src="/no-code-ai.svg" width={56} height={56} />
                      </div>
                      <div>
                        <p className="text-[16px] leading-[20px] text-black">AI Website Mastery</p>
                        <p className="text-[14px] leading-[18px] text-[#595959]">
                          Automate without coding
                        </p>
                      </div>
                    </Link>

                    <Link href="/academy/ui-ux-mastery-program/" className="flex items-center gap-3">
                      <div>
                        <Image src="/ui-ux.svg" width={56} height={56} />
                      </div>
                      <div>
                        <p className="text-[16px] leading-[20px] text-black">UI / UX Mastery</p>
                        <p className="text-[14px] leading-[18px] text-[#595959]">
                          Better user experience
                        </p>
                      </div>
                    </Link>

                  </div>
                </div>
              </div>

              <Link href="/about/">About</Link>
              {/* <Link href="#">Case Studies</Link> */}
              <Link href="/contact/">Contact</Link>
            </nav>

            {/* CTA */}
            <button className="bg-[#084734] px-6 py-3 rounded-full font-medium hover:opacity-90 transition">
              <span>Lets Collaborate</span>
            </button>
          </div>

          {/* ================= MOBILE ================= */}
          <div className="lg:hidden flex items-center justify-between bg-white rounded-md py-4">
            <Link href="/">
              <img src="/growth-scraper-logo.svg" className="w-[150px] h-10" />
            </Link>

            <div className="flex items-center gap-4">
              <button className="bg-[#084734] px-5 py-2 rounded-full text-sm font-medium">
                <span>Lets Collaborate</span>
              </button>

              <span onClick={() => setIsOpen(true)}>
                <Menu className="w-6 h-6 text-gray-700" />
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ================= DRAWER ================= */}

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[320px] bg-white z-50 transform transition ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >

        {/* Close */}
        <div className="flex justify-end p-6">
          <span onClick={() => setIsOpen(false)}>
            <X className="w-6 h-6 text-gray-700" />
          </span>
        </div>

        {/* Links */}
        <div className="px-6 flex flex-col gap-5 text-gray-700 font-medium">
          <Link href="/solutions/" onClick={() => setIsOpen(false)}>Solutions</Link>

          {/* MOBILE DROPDOWN */}
          <div>
            <span
              className="flex items-center justify-between w-full"
              onClick={() => setMobileDropdown(!mobileDropdown)}
            >
              Academy
              <ChevronDown
                size={16}
                className={`transition ${mobileDropdown ? "rotate-180" : ""
                  }`}
              />
            </span>

            {/* Dropdown Content */}
            <div
              className={`overflow-hidden transition-all duration-300 ${mobileDropdown ? "max-h-[300px] mt-3" : "max-h-0"
                }`}
            >
              <div className="flex flex-col gap-3 pl-2 text-sm text-gray-600">
                <Link href="/academy/seo-mastery-program/">SEO Mastery</Link>
                <Link href="/academy/no-code-ai-website-mastery-program/">AI Website Mastery</Link>
                <Link href="/academy/ui-ux-mastery-program/">UI / UX Mastery</Link>
              </div>
            </div>
          </div>

          <Link href="/about/" onClick={() => setIsOpen(false)}>About</Link>
          {/* <Link href="#" onClick={() => setIsOpen(false)}>Case Studies</Link> */}
          <Link href="/contact/" onClick={() => setIsOpen(false)}>Contact</Link>

        </div>
      </div>
    </>
  );
}