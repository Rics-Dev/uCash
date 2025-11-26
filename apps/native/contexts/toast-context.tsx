import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { GlassToast, ToastType } from "../components/GlassToast";

interface ToastContextType {
  showToast: (params: { message: string; type: ToastType }) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const showToast = useCallback(({ message, type }: { message: string; type: ToastType }) => {
    setToast({ message, type });
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <GlassToast
          message={toast.message}
          type={toast.type}
          onDismiss={hideToast}
        />
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
