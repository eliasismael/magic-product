"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import icon from "@/app/favicon.ico";

import { ConnectButton } from "@rainbow-me/rainbowkit";

const links = [
  { href: "/", label: "Home" },
  { href: "/my-products", label: "Mis Productos" },
  { href: "/favorites", label: "Favoritos" },
  { href: "/dashboard", label: "Dashboard" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full from-slate-100  bg-linear-to-t to-slate-300 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="leading-tight flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={icon}
                alt="Ícono de la página"
                width={40}
                height={40}
              />

              <h1 className="text-base sm:text-lg font-semibold text-slate-900 inline">
                Magic Product
              </h1>
            </Link>
          </div>
        </div>

        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-4">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 text-sm rounded-2xl transition
                  ${
                    active
                      ? "bg-[#e5e9f2] shadow-sm text-slate-900"
                      : "text-slate-500 hover:text-slate-900 "
                  }
                `}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto">
          <ConnectButton />
        </div>

        {/***** MOBILE ******/}
        <button
          onClick={() => setOpen((p) => !p)}
          className="md:hidden ml-auto rounded-3lx py-0.5 px-1 bg-[#e5e9f2]  flex items-center justify-center"
          aria-label="Abrir menú"
        >
          Menu
        </button>
      </div>

      {open && (
        <div className="md:hidden px-4 pb-4">
          <div className="rounded-3xl bg-[#e5e9f2] shadow-sm p-3 space-y-2">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-2xl px-3 py-2 text-sm transition ${
                    active
                      ? "bg-white/40 text-slate-900"
                      : "text-slate-600 hover:bg-white/40"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
