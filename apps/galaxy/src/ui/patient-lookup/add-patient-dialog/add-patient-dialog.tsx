'use client'

import { useState } from 'react'
import { Button, Dialog, Flex, Separator } from '@radix-ui/themes'
import { Plus, X } from 'lucide-react'
import { GooglePlacesContextProvider } from '@/providers/google-places-provider'
import { AddPatientForm } from './add-patient-form'

interface AddPatientDialogProps {
  googleApiKey: string
}
const AddPatientDialog = ({ googleApiKey }: AddPatientDialogProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const handleClose = () => setIsOpen(false)

  return (
    <Dialog.Root open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
      <Dialog.Trigger>
        <Button size="1" variant="solid" highContrast>
          <Plus size={14} />
          No Email Add Patient
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="relative max-w-[630px] !overflow-visible rounded-3 p-0">
        <Flex justify="between" py="4" className="px-[20px]">
          <Flex align="end" gap="3">
            <Plus size={26} height={31} className="stroke-pp-icon-sub" />
            <Dialog.Title size="6" className="m-0 font-[600]">
              No Email Add Patient
            </Dialog.Title>
          </Flex>
          <Dialog.Close className="cursor-pointer">
            <X size={20} strokeWidth={1.5} />
          </Dialog.Close>
        </Flex>
        <Separator orientation="horizontal" className="border-pp-grey w-full" />
        <GooglePlacesContextProvider apiKey={googleApiKey}>
          <AddPatientForm closeDialog={handleClose} />
        </GooglePlacesContextProvider>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AddPatientDialog }
