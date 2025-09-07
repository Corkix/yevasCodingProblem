"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Toast = { id: number; text: string };
type ToastContext = { add: (text: string, opts?: { timeout?: number }) => void };

const ToastCtx = createContext<ToastContext | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const add = useCallback((text: string, opts?: { timeout?: number }) => {
    const id = Date.now();
    setToasts((t) => [...t, { id, text }]);

    const timeout = Math.max(1200, opts?.timeout ?? 2200);
    const tmr = setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, timeout);


    return () => clearTimeout(tmr);
  }, []);

  const value = useMemo(() => ({ add }), [add]);

  return (
    <ToastCtx.Provider value={value}>
      {children}

    
      <div
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] space-y-2"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        <AnimatePresence initial={false}>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12 }}
              className="rounded-xl px-4 py-2 bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-soft"
            >
              {t.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastCtx.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}
