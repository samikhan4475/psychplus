'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Dialog } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { FormFieldContainer, FormSubmitButton } from '@/components'
import { ShuffelIcon } from '@/components/icons'
import { LinkAccountForm } from './filters/link-account-form'
import { AddLinkAccountTable } from './table'

interface AddAccountLinkDialogProps {
  patientId: string
}
const AddAccountLink = ({ patientId }: AddAccountLinkDialogProps) => {
  const [openDialog, setOpenDialog] = useState(false)

  return (
    <Dialog.Root open={openDialog} onOpenChange={setOpenDialog}>
      <Dialog.Trigger>
        <Button
          color="gray"
          className="text-black bg-white disabled:!bg-pp-gray-2"
          size="1"
          variant="surface"
        >
          <ShuffelIcon /> Link Account
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="relative w-[1500px] max-w-full !overflow-visible rounded-3 p-6">
        <Dialog.Close className="absolute right-6 top-6 cursor-pointer">
          <X size={20} strokeWidth={1.5} />
        </Dialog.Close>
        <Dialog.Title size="6" className="font-medium">
          Link Account
        </Dialog.Title>
        <LinkAccountForm />
        <AddLinkAccountTable />
        <Box className="mt-4 flex justify-end">
          <Button type="button" size="1" highContrast>
            Save
          </Button>
        </Box>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AddAccountLink }
