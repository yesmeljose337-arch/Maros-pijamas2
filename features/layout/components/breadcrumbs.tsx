"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { adminNavItems } from "../config/navigation";

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const currentNavItem = adminNavItems.find((item) =>
    pathname.startsWith(item.href)
  );

  return (
    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
      <Link href="/admin/dashboard" className="hover:text-foreground">
        Admin
      </Link>
      {currentNavItem && (
        <>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground font-medium">
            {currentNavItem.label}
          </span>
        </>
      )}
      {segments.length > 2 && (
        <>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="capitalize">{segments[segments.length - 1]}</span>
        </>
      )}
    </div>
  );
}