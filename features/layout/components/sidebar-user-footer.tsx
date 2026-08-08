"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const mockUser = {
  name: "Valentina Maro",
  role: "Administradora",
  initial: "V",
};

interface SidebarUserFooterProps {
  collapsed: boolean;
}

export function SidebarUserFooter({ collapsed }: SidebarUserFooterProps) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("maros-admin-mock-auth");
    router.push("/login");
  };

  if (collapsed) {
    return (
      <div className="border-t border-border p-3 flex justify-center">
        <Tooltip>
          <TooltipTrigger asChild>
            <Avatar className="h-9 w-9 cursor-default">
              <AvatarFallback className="bg-accent text-accent-foreground text-sm">
                {mockUser.initial}
              </AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent side="right">
            {mockUser.name} — {mockUser.role}
          </TooltipContent>
        </Tooltip>
      </div>
    );
  }

  return (
    <div className="border-t border-border p-3 flex items-center gap-2">
      <Avatar className="h-9 w-9 shrink-0">
        <AvatarFallback className="bg-accent text-accent-foreground text-sm">
          {mockUser.initial}
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-foreground truncate">
          {mockUser.name}
        </p>
        <p className="text-xs text-muted-foreground truncate">{mockUser.role}</p>
      </div>
      <button
        onClick={handleLogout}
        className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-destructive transition-colors shrink-0"
        title="Cerrar sesión"
      >
        <LogOut className="h-4 w-4" />
      </button>
    </div>
  );
}