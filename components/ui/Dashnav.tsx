"use client";

import { Button } from "@/components/ui/button";
import { Menu, Package, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Dashnav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="border-b bg-white z-50 relative">
      <div className="w-full max-w-screen-xl mx-auto flex h-16 items-center justify-between px-4 md:px-8 lg:px-12 xl:px-16">
        <Link href="/" className="flex items-center gap-2">
          <Package className="h-6 w-6 text-teal-600" />
          <span className="text-xl font-bold">dPackChain</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center">
          <Link
            href="/"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Home
          </Link>
          <Link
            href="#features"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            How It Works
          </Link>
          <Link
            href="/dashboard"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Dashboard
          </Link>
        </nav>

        <div className="hidden md:flex gap-4 items-center">
          <Link href="/track">
            <Button variant="outline">Track Package</Button>
          </Link>
          <Link href="/register-shipment">
            <Button>Register Shipment</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(true)}>
          <Menu className="h-6 w-6 text-teal-600" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/30">
          <div className="w-64 h-full bg-white shadow-lg rounded-l-lg p-4 flex flex-col gap-4">
            <div className="flex justify-end">
              <button onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5 text-gray-700" />
              </button>
            </div>
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium hover:underline underline-offset-4 text-left"
            >
              Home
            </Link>
            <Link
              href="#features"
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium hover:underline underline-offset-4 text-left"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium hover:underline underline-offset-4 text-left"
            >
              How It Works
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium hover:underline underline-offset-4 text-left"
            >
              Dashboard
            </Link>
            <Link href="/track" onClick={() => setIsOpen(false)}>
              <Button variant="outline" className="w-full justify-start">
                Track Package
              </Button>
            </Link>
            <Link href="/register-shipment" onClick={() => setIsOpen(false)}>
              <Button className="w-full justify-start">
                Register Shipment
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Dashnav;
