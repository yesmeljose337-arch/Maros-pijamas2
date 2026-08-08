"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { USER_ROLES, PERMISSION_MODULES } from "../types";
import type { PermissionMatrix } from "../types";

interface RolesPermissionsPanelProps {
  matrix: PermissionMatrix;
  onChange: (matrix: PermissionMatrix) => void;
}

export function RolesPermissionsPanel({ matrix, onChange }: RolesPermissionsPanelProps) {
  function toggle(role: (typeof USER_ROLES)[number], module: (typeof PERMISSION_MODULES)[number]) {
    if (role === "Administrador") return; // el rol Administrador siempre tiene acceso total
    onChange({
      ...matrix,
      [role]: { ...matrix[role], [module]: !matrix[role][module] },
    });
  }

  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs text-muted-foreground mb-3">
        Matriz visual de permisos por rol. La aplicación real (bloqueo de rutas/acciones) se activa cuando conectemos autenticación con roles en el backend.
      </p>
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/40">
              <th className="text-left font-medium text-foreground px-4 py-2.5">Módulo</th>
              {USER_ROLES.map((role) => (
                <th key={role} className="text-center font-medium text-foreground px-4 py-2.5">{role}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PERMISSION_MODULES.map((module) => (
              <tr key={module} className="border-b border-border last:border-0">
                <td className="px-4 py-2.5 text-foreground">{module}</td>
                {USER_ROLES.map((role) => (
                  <td key={role} className="text-center px-4 py-2.5">
                    <Checkbox
                      checked={matrix[role][module]}
                      disabled={role === "Administrador"}
                      onCheckedChange={() => toggle(role, module)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}