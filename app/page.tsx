import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";

export default function RootPage() {
  // Redirige automáticamente a la ruta que prefieras
  redirect("/login"); 
}

