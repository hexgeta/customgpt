"use client"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { CheckCircle2, XCircle } from "lucide-react"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider duration={5000}>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        const isDestructive = variant === "destructive"
        return (
          <Toast 
            key={id} 
            {...props} 
            className={`border-none rounded-xl p-4 shadow-lg ${
              isDestructive ? 'bg-red-100' : 'bg-green-100'
            }`}
          >
            <div className="flex items-start gap-3">
              {isDestructive ? (
                <XCircle className="h-6 w-6 text-red-600 mt-0.5" />
              ) : (
                <CheckCircle2 className="h-6 w-6 text-green-600 mt-0.5" />
              )}
              <div className="grid gap-1.5">
                {title && (
                  <ToastTitle className={`text-lg font-mono font-bold ${
                    isDestructive ? 'text-red-800' : 'text-green-800'
                  }`}>
                    {title}
                  </ToastTitle>
                )}
                {description && (
                  <ToastDescription className={`font-mono text-sm leading-relaxed ${
                    isDestructive ? 'text-red-700' : 'text-green-700'
                  }`}>
                    {description}
                  </ToastDescription>
                )}
              </div>
            </div>
            <ToastClose className={`${
              isDestructive 
                ? 'text-red-600 hover:text-red-800' 
                : 'text-green-600 hover:text-green-800'
            } transition-colors`} />
          </Toast>
        )
      })}
      <ToastViewport className="p-6" />
    </ToastProvider>
  )
}