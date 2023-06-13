"use client";

import { SnackbarProvider } from "notistack";
import { AuthProvider } from "@/hooks/useAuth";

export default function ProviderWrapper({ children }) {
  return (
    <SnackbarProvider>
      <AuthProvider>{children}</AuthProvider>
    </SnackbarProvider>
  );
}
