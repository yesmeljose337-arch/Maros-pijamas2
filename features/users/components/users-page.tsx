"use client";

import { useCallback, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { ContentCard } from "@/components/shared/content-card";
import { PageHeader } from "@/components/shared/page-header";
import { toast } from "@/lib/toast";
import { UserTable } from "./user-table";
import { InviteUserDialog } from "./invite-user-dialog";
import { EditUserDialog } from "./edit-user-dialog";
import { RolesPermissionsPanel } from "./roles-permissions-panel";
import {
  getUsers,
  inviteUser,
  updateUser,
  removeUser,
  getPermissionMatrix,
  updatePermissionMatrix,
} from "../services/users.service";
import type { AdminUser, PermissionMatrix, UserRole } from "../types";

const CURRENT_USER_ID = "u1";

export function UsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [matrix, setMatrix] = useState<PermissionMatrix | null>(null);
  const [loading, setLoading] = useState(true);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<AdminUser | null>(null);
  const [removeTarget, setRemoveTarget] = useState<AdminUser | null>(null);
  const [savingMatrix, setSavingMatrix] = useState(false);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    const [usersData, matrixData] = await Promise.all([getUsers(), getPermissionMatrix()]);
    setUsers(usersData);
    setMatrix(matrixData);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  async function handleInvite(data: { name: string; email: string; role: UserRole }) {
    await inviteUser(data);
    toast.success(`Invitación enviada a ${data.email}`);
    fetchAll();
  }

  async function handleRoleChange(id: string, role: UserRole) {
    await updateUser(id, { role });
    toast.success("Rol actualizado");
    fetchAll();
  }

  async function handleEditSave(id: string, data: { name: string; email: string }) {
    await updateUser(id, data);
    toast.success("Usuario actualizado");
    fetchAll();
  }

  async function confirmRemove() {
    if (!removeTarget) return;
    await removeUser(removeTarget.id);
    toast.success(`${removeTarget.name} fue eliminado del panel`);
    setRemoveTarget(null);
    fetchAll();
  }

  async function handleSaveMatrix() {
    if (!matrix) return;
    setSavingMatrix(true);
    await updatePermissionMatrix(matrix);
    setSavingMatrix(false);
    toast.success("Permisos actualizados");
  }

  if (loading || !matrix) return <Skeleton className="h-96 w-full rounded-lg" />;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Usuarios"
        subtitle="Gestiona los usuarios y roles del sistema"
        action={
          <Button onClick={() => setInviteOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Invitar usuario
          </Button>
        }
      />

      <Tabs defaultValue="usuarios">
        <TabsList>
          <TabsTrigger value="usuarios">Usuarios</TabsTrigger>
          <TabsTrigger value="roles">Roles y permisos</TabsTrigger>
        </TabsList>

        <TabsContent value="usuarios" className="pt-4">
          <ContentCard noPadding>
            <UserTable
              users={users}
              currentUserId={CURRENT_USER_ID}
              onRoleChange={handleRoleChange}
              onEdit={setEditTarget}
              onRemove={setRemoveTarget}
            />
          </ContentCard>
        </TabsContent>

        <TabsContent value="roles" className="pt-4 flex flex-col gap-4">
          <ContentCard>
            <RolesPermissionsPanel matrix={matrix} onChange={setMatrix} />
            <div className="flex justify-end mt-4">
              <Button onClick={handleSaveMatrix} disabled={savingMatrix}>
                {savingMatrix ? "Guardando..." : "Guardar permisos"}
              </Button>
            </div>
          </ContentCard>
        </TabsContent>
      </Tabs>

      <InviteUserDialog open={inviteOpen} onOpenChange={setInviteOpen} onInvite={handleInvite} />
      <EditUserDialog
        open={!!editTarget}
        onOpenChange={(open) => !open && setEditTarget(null)}
        user={editTarget}
        onSave={handleEditSave}
      />
      <ConfirmDialog
        open={!!removeTarget}
        onOpenChange={(open) => !open && setRemoveTarget(null)}
        title="Eliminar usuario"
        description={`¿Seguro que quieres eliminar a "${removeTarget?.name}" del panel? Perderá acceso inmediatamente.`}
        confirmText="Eliminar"
        onConfirm={confirmRemove}
      />
    </div>
  );
}