"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FAQ_CATEGORIES } from "../types";
import type { FaqItem, FaqStatus } from "../types";

interface FaqDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingItem: FaqItem | null;
  onSave: (data: { question: string; answer: string; category: string; status: FaqStatus }) => void;
}

export function FaqDialog({ open, onOpenChange, editingItem, onSave }: FaqDialogProps) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState<string>(FAQ_CATEGORIES[0]);
  const [status, setStatus] = useState<FaqStatus>("borrador");

  useEffect(() => {
    if (open) {
      setQuestion(editingItem?.question ?? "");
      setAnswer(editingItem?.answer ?? "");
      setCategory(editingItem?.category ?? FAQ_CATEGORIES[0]);
      setStatus(editingItem?.status ?? "borrador");
    }
  }, [open, editingItem]);

  function handleSubmit() {
    if (!question.trim() || !answer.trim()) return;
    onSave({ question: question.trim(), answer: answer.trim(), category, status });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editingItem ? "Editar pregunta" : "Nueva pregunta"}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div>
            <Label className="mb-1.5 block">Pregunta</Label>
            <Input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="¿Cuánto tiempo tarda el pedido?" />
          </div>
          <div>
            <Label className="mb-1.5 block">Respuesta</Label>
            <Textarea rows={4} value={answer} onChange={(e) => setAnswer(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="mb-1.5 block">Categoría</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {FAQ_CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-1.5 block">Estado</Label>
              <Select value={status} onValueChange={(v) => setStatus(v as FaqStatus)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="publicada">Publicada</SelectItem>
                  <SelectItem value="borrador">Borrador</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={handleSubmit}>{editingItem ? "Guardar cambios" : "Crear"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}