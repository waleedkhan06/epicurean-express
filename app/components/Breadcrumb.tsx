"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/app/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center gap-2 text-sm", className)}>
      <Link
        href="/"
        className="text-obsidian-500 hover:text-gold-400 transition-colors flex items-center gap-1"
        aria-label="Home"
      >
        <Home className="w-4 h-4" />
      </Link>
      {items.map((item, index) => (
        <div key={item.label} className="flex items-center gap-2">
          <ChevronRight className="w-3 h-3 text-obsidian-600" aria-hidden="true" />
          {item.href ? (
            <Link
              href={item.href}
              className="text-obsidian-400 hover:text-gold-400 transition-colors font-body"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gold-400 font-body">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
