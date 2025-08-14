'use client'

import { useEffect } from 'react'
import toast from 'react-hot-toast'

const initializeToastOverrides = () => {
  const originalSuccess = toast.success
  const originalError = toast.error
  const originalLoading = toast.loading

  toast.success = (message, options = {}) => {
    toast.dismiss() 
    return originalSuccess(message, { duration: 5000, ...options })
  }

  toast.error = (message, options = {}) => {
    toast.dismiss()
    return originalError(message, { duration: 5000, ...options })
  }

  toast.loading = (message, options = {}) => {
    toast.dismiss()
    return originalLoading(message, options)
  }
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initializeToastOverrides()
  }, [])

  return <>{children}</>
}