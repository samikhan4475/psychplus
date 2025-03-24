'use client'

import { PropsWithChildren, useState } from 'react'
import { Dialog, IconButton, Tooltip } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { GooglePlacesContextProvider } from '@/providers/google-places-provider'
import { Location, Service } from '@/types'
import { ServiceForm } from './service-form'

interface AddLocationServiceDialogProps {
  googleApiKey: string
  location?: Location
  service?: Service
  title: string
  onDone?: () => void
}

const AddLocationServiceDialog = ({
  googleApiKey,
  location,
  children,
  service,
  title,
  onDone,
}: PropsWithChildren<AddLocationServiceDialogProps>) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Tooltip content={title}>
        <Dialog.Trigger>
          <IconButton
            variant="ghost"
            className="!m-0"
            type="button"
            color="gray"
            size="1"
            highContrast
          >
            {children}
          </IconButton>
        </Dialog.Trigger>
      </Tooltip>
      <Dialog.Content className="relative max-w-[662px] !overflow-visible rounded-3 p-6">
        <Dialog.Close className="absolute right-6 top-6 cursor-pointer">
          <X size={20} strokeWidth={1.5} />
        </Dialog.Close>
        <Dialog.Title size="4" className="font-bold">
          {title}
        </Dialog.Title>
        <GooglePlacesContextProvider apiKey={googleApiKey}>
          <ServiceForm
            location={location}
            service={service}
            onClose={() => {
              setIsOpen(false)
              onDone?.()
            }}
          />
        </GooglePlacesContextProvider>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AddLocationServiceDialog }
