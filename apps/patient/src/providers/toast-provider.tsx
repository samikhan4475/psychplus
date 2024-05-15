'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import * as Toast from '@radix-ui/react-toast'
import { Flex, Text } from '@radix-ui/themes'
import { CheckIcon, XIcon } from 'lucide-react'

interface ToastData {
  type?: 'info' | 'success' | 'error'
  title?: string
  description?: string
  action?: React.ReactNode
  actionAltText?: string
}

interface ToastContextType {
  toast: (data: ToastData) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

const ToastProvider = ({ children }: React.PropsWithChildren) => {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState<ToastData>()
  const timerRef = useRef(0)

  useEffect(() => {
    const timeoutId = timerRef.current
    return () => clearTimeout(timeoutId)
  }, [])

  const toast = useCallback((data: ToastData) => {
    setOpen(false)
    setData(data)
    window.clearTimeout(timerRef.current)

    timerRef.current = window.setTimeout(() => {
      setOpen(true)
    }, 100)
  }, [])

  const toastType = data ? data.type ?? 'info' : undefined

  const contextValue = useMemo(() => ({ toast }), [toast])

  return (
    <Toast.Provider swipeDirection="right" duration={4000}>
      <ToastContext.Provider value={contextValue}>
        {children}
        <Toast.Root
          className="data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=end]:animate-swipeOut rounded-md bg-white relative grid grid-cols-[auto_max-content] items-center gap-x-[15px] rounded-2 p-4 shadow-3 [grid-template-areas:_'title_action'_'description_action'] data-[swipe=cancel]:translate-x-0 data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:transition-[transform_200ms_ease-out]"
          open={open}
          onOpenChange={setOpen}
        >
          <Toast.Close aria-label="Close" asChild>
            <Flex
              align="center"
              justify="center"
              className="rounded-full absolute right-1 top-1 h-[30px] w-[30px] cursor-pointer text-gray-7 transition-colors hover:bg-gray-2 hover:text-gray-10"
            >
              <XIcon width={18} height={18} strokeWidth={1.5} />
            </Flex>
          </Toast.Close>

          <Flex align="center" gap="3">
            {renderToastType(toastType)}
            <Flex direction="column" gap="1">
              {data?.title ? (
                <Toast.Title className="text-[14px] font-medium text-slate-12 [grid-area:_title]">
                  {data.title}
                </Toast.Title>
              ) : null}
              {data?.description ? (
                <Toast.Description asChild>
                  <Text className="text-[13px] text-gray-11">
                    {data.description}
                  </Text>
                </Toast.Description>
              ) : null}
            </Flex>
          </Flex>

          {data?.action ? (
            <Toast.Action
              className="[grid-area:_action]"
              asChild
              altText={data.actionAltText ?? 'toast action'}
            >
              {data.action}
            </Toast.Action>
          ) : null}
        </Toast.Root>
        <Toast.Viewport className="fixed bottom-0 right-0 z-50 m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-[10px] p-[var(--viewport-padding)] outline-none [--viewport-padding:_25px]" />
      </ToastContext.Provider>
    </Toast.Provider>
  )
}

const renderToastType = (toastType: ToastData['type']) => {
  if (toastType === 'success') {
    return (
      <Flex
        align="center"
        justify="center"
        className="rounded-full h-[30px] w-[30px] min-w-[30px] bg-green-3"
      >
        <CheckIcon width={20} height={20} className="text-green-10" />
      </Flex>
    )
  }
}

const useToast = () => {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error(`useToast must be use within ToastProvider`)
  }

  return context
}

export { ToastProvider, useToast, type ToastData }
