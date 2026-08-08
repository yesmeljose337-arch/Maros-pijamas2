import Link from "next/link";
import { Plus, Layers, ClipboardList } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const actions = [
  { label: "Nuevo producto", href: "/admin/productos/nuevo", icon: Plus },
  { label: "Nueva colección", href: "/admin/colecciones", icon: Layers },
  { label: "Ver cotizaciones", href: "/admin/cotizaciones", icon: ClipboardList },
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">Acciones rápidas</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Button key={action.href} variant="secondary" className="justify-start" asChild>
              <Link href={action.href}>
                <Icon className="h-4 w-4 mr-2" />
                {action.label}
              </Link>
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
}