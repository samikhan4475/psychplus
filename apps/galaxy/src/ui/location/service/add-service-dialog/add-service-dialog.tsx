'use client'

import { useState } from 'react'
import { Button, Dialog } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { LinkIcon } from '@/components/icons'
import { AddServiceForm } from './add-service-form'
import { GooglePlacesContextProvider } from '@/providers/google-places-provider'

interface AddLocationServiceDialogProps {
  googleApiKey: string
}

const AddLocationServiceDialog = ({googleApiKey}: AddLocationServiceDialogProps) => {
  const [openDialog, setOpenDialog] = useState(false)
  return (
    <Dialog.Root open={openDialog} onOpenChange={setOpenDialog}>
      <Dialog.Trigger>
        <Button
          color="gray"
          className="p-0 bg-transparent"
          size="1"
        >
          <LinkIcon />
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="relative max-w-[662px] !overflow-visible rounded-3 p-6">
        <Dialog.Close className="absolute right-6 top-6 cursor-pointer">
          <X size={20} strokeWidth={1.5} />
        </Dialog.Close>
        <Dialog.Title size="6" className="font-medium">
          Add Service
        </Dialog.Title>
        <GooglePlacesContextProvider apiKey={googleApiKey}>
          <AddServiceForm />
        </GooglePlacesContextProvider>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AddLocationServiceDialog }