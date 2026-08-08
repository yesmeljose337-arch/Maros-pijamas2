import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function RecuperarPasswordPage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="font-heading text-2xl">Recuperar contraseña</CardTitle>
          <p className="text-sm text-muted-foreground">
            Te enviaremos un enlace a tu correo (disponible cuando conectemos el backend real).
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div>
            <Label className="mb-1.5 block">Correo electrónico</Label>
            <Input placeholder="admin@marospijamas.com" disabled />
          </div>
          <Button disabled className="w-full">
            Enviar enlace
          </Button>
          <Link href="/login" className="text-sm text-primary hover:underline text-center">
            Volver a iniciar sesión
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}