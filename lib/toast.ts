import { toast as sonnerToast } from "sonner";

export const toast = {
  success: (message: string) =>
    sonnerToast.success(message, {
      style: {
        background: "var(--primary)",
        color: "var(--primary-foreground)",
        border: "none",
      },
    }),
  error: (message: string) =>
    sonnerToast.error(message, {
      style: {
        background: "var(--destructive)",
        color: "var(--destructive-foreground)",
        border: "none",
      },
    }),
  info: (message: string) =>
    sonnerToast(message, {
      style: {
        background: "var(--card)",
        color: "var(--foreground)",
        border: "1px solid var(--border)",
      },
    }),
};