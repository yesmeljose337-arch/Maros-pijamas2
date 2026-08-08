import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QUOTATION_STATUSES } from "../types";
import type { QuotationStatus } from "../types";

interface QuotationStatusSelectProps {
  value: QuotationStatus;
  onChange: (value: QuotationStatus) => void;
}

export function QuotationStatusSelect({ value, onChange }: QuotationStatusSelectProps) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as QuotationStatus)}>
      <SelectTrigger className="w-44">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {QUOTATION_STATUSES.map((s) => (
          <SelectItem key={s.value} value={s.value}>
            {s.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}