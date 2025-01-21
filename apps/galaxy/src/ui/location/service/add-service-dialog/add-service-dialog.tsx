'use client'

import { useState } from 'react'
import { Button, Dialog, IconButton, Tooltip } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { LinkIcon } from '@/components/icons'
import { GooglePlacesContextProvider } from '@/providers/google-places-provider'
import { Location } from '@/types'
import { ServiceForm } from './service-form'

interface AddLocationServiceDialogProps {
  googleApiKey: string
  location: Location
}

const AddLocationServiceDialog = ({
  googleApiKey,
  location,
}: AddLocationServiceDialogProps) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger>
        <Button color="gray" className="bg-transparent p-0" size="1">
          <Tooltip content="Add Service">
            <IconButton
              variant="ghost"
              className="!m-0"
              type="button"
              color="gray"
              size="1"
              highContrast
            >
              <LinkIcon />
            </IconButton>
          </Tooltip>
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="relative max-w-[662px] !overflow-visible rounded-3 p-6">
        <Dialog.Close className="absolute right-6 top-6 cursor-pointer">
          <X size={20} strokeWidth={1.5} />
        </Dialog.Close>
        <Dialog.Title size="4" className="font-bold">
          Add Service
        </Dialog.Title>
        <GooglePlacesContextProvider apiKey={googleApiKey}>
          <ServiceForm location={location} onClose={() => setIsOpen(false)} />
        </GooglePlacesContextProvider>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AddLocationServiceDialog }
