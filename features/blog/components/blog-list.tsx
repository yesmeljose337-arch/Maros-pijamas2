"use client";

import { useCallback, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { toast } from "@/lib/toast";
import { BlogTable } from "./blog-table";
import { BlogPostDialog } from "./blog-post-dialog";
import { getBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost } from "../services/blog.service";
import type { BlogPost } from "../types";

export function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<BlogPost | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const data = await getBlogPosts();
    setPosts(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  async function handleSave(data: Omit<BlogPost, "id">) {
    if (editingPost) {
      await updateBlogPost(editingPost.id, data);
      toast.success("Artículo actualizado");
    } else {
      await createBlogPost(data);
      toast.success(data.status === "programado" ? "Artículo programado" : "Artículo publicado");
    }
    fetchPosts();
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    await deleteBlogPost(deleteTarget.id);
    toast.success("Artículo eliminado");
    setDeleteTarget(null);
    fetchPosts();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl text-foreground">Blog</h1>
          <p className="text-muted-foreground mt-1">Administra los artículos del blog</p>
        </div>
        <Button onClick={() => { setEditingPost(null); setDialogOpen(true); }}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo artículo
        </Button>
      </div>

      {loading ? (
        <Skeleton className="h-96 w-full rounded-lg" />
      ) : (
        <BlogTable
          posts={posts}
          onEdit={(post) => { setEditingPost(post); setDialogOpen(true); }}
          onDelete={setDeleteTarget}
        />
      )}

      <BlogPostDialog open={dialogOpen} onOpenChange={setDialogOpen} editingPost={editingPost} onSave={handleSave} />
      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Eliminar artículo"
        description={`¿Seguro que quieres eliminar "${deleteTarget?.title}"?`}
        confirmText="Eliminar"
        onConfirm={confirmDelete}
      />
    </div>
  );
}