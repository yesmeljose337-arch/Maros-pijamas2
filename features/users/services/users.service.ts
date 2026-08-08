import { mockUsers, mockPermissionMatrix } from "../mocks/users.mock";
import type { AdminUser, PermissionMatrix, UserRole } from "../types";

let usersStore: AdminUser[] = [...mockUsers];
let permissionsStore: PermissionMatrix = { ...mockPermissionMatrix };

function delay<T>(data: T, ms = 250): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

export async function getUsers(): Promise<AdminUser[]> {
  return delay([...usersStore]);
}

export async function inviteUser(data: { name: string; email: string; role: UserRole }): Promise<AdminUser> {
  const newUser: AdminUser = {
    ...data,
    id: `u${Date.now()}`,
    status: "pendiente",
    lastAccess: "Nunca",
  };
  usersStore = [...usersStore, newUser];
  return delay(newUser);
}

export async function updateUser(id: string, data: Partial<AdminUser>): Promise<AdminUser | undefined> {
  usersStore = usersStore.map((u) => (u.id === id ? { ...u, ...data } : u));
  return delay(usersStore.find((u) => u.id === id));
}

export async function removeUser(id: string): Promise<void> {
  usersStore = usersStore.filter((u) => u.id !== id);
  return delay(undefined);
}

export async function getPermissionMatrix(): Promise<PermissionMatrix> {
  return delay({ ...permissionsStore });
}

export async function updatePermissionMatrix(matrix: PermissionMatrix): Promise<PermissionMatrix> {
  permissionsStore = { ...matrix };
  return delay({ ...permissionsStore });
}