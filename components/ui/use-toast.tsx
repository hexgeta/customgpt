import { useState, useCallback } from 'react'
import { Toast } from './toast'

type ToastOptions = {
  title?: string
  description?: string
  className?: string
  variant?: 'default' | 'destructive'
  duration?: number
}

let toastFn: (options: ToastOptions) => void

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toastOptions, setToastOptions] = useState<ToastOptions | null>(null)

  toastFn = useCallback((options: ToastOptions) => {
    setToastOptions(options)
  }, [])

  return (
    <>
      {children}
      {toastOptions && <Toast {...toastOptions} />}
    </>
  )
}

export const toast = (options: ToastOptions) => {
  if (typeof toastFn !== 'function') {
    console.warn('Toast was called before ToastProvider was initialized')
    return
  }
  toastFn(options)
} 