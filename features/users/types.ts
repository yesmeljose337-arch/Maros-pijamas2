export type UserRole = "Administrador" | "Editor" | "Viewer";
export type UserStatus = "activo" | "inactivo" | "pendiente";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  lastAccess: string;
}

export const USER_ROLES: UserRole[] = ["Administrador", "Editor", "Viewer"];

export const PERMISSION_MODULES = [
  "Productos",
  "Colecciones y Temporadas",
  "Cotizaciones y Clientes",
  "Contenido (Galería, Blog, Testimonios)",
  "Configuración y Apariencia",
  "Usuarios",
] as const;

export type PermissionModule = (typeof PERMISSION_MODULES)[number];

// true = puede editar, false = solo lectura o sin acceso según el módulo
export type PermissionMatrix = Record<UserRole, Record<PermissionModule, boolean>>;