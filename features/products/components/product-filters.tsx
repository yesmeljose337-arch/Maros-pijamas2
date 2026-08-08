import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PRODUCT_CATEGORIES } from "../types";
import type { ProductStatus } from "../types";

interface ProductFiltersProps {
  category: string;
  status: ProductStatus | "todos";
  onCategoryChange: (value: string) => void;
  onStatusChange: (value: ProductStatus | "todos") => void;
}

export function ProductFilters({
  category,
  status,
  onCategoryChange,
  onStatusChange,
}: ProductFiltersProps) {
  return (
    <div className="flex gap-2">
      <Select value={category} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Categoría" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todas">Todas las categorías</SelectItem>
          {PRODUCT_CATEGORIES.map((c) => (
            <SelectItem key={c} value={c}>
              {c}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={status} onValueChange={(v) => onStatusChange(v as ProductStatus | "todos")}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Estado" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Todos los estados</SelectItem>
          <SelectItem value="activo">Activo</SelectItem>
          <SelectItem value="borrador">Borrador</SelectItem>
          <SelectItem value="archivado">Archivado</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}