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
import { CheckCircle2 } from "lucide-react"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider duration={5000}>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props} className="bg-green-100 border-none rounded-xl p-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
              <div className="grid gap-1">
                {title && <ToastTitle className="text-green-800 text-lg">{title}</ToastTitle>}
                {description && (
                  <ToastDescription className="text-green-700">{description}</ToastDescription>
                )}
              </div>
            </div>
            <ToastClose className="text-green-600 hover:text-green-800" />
          </Toast>
        )
      })}
      <ToastViewport className="p-6" />
    </ToastProvider>
  )
}