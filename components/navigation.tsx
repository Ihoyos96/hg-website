"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "About", href: "/about" },
  { name: "Domains", href: "/domains" },
  { name: "Opportunities", href: "/opportunities" },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="flex items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center hover-glow absolute left-12 top-4">
          <Image
            src="/hatsgroup-logo-transparent.png"
            alt="Hats Group"
            width={45}
            height={45}
            className="opacity-90 hover:opacity-100 transition-opacity"
          />
        </Link>

        <div className="flex items-center space-x-8 ml-auto mr-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-serif font-medium transition-all duration-300 hover-glow",
                "hover:text-foreground",
              )}
              style={{
                color: "#e8e8e8",
                textShadow: pathname === item.href ? "0 0 8px #e8e8e8, 0 0 16px #d1d5db" : "none",
              }}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
