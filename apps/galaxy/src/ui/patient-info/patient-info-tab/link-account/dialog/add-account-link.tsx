'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Dialog } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { ShuffelIcon } from '@/components/icons'
import { LinkAccountForm } from './filters/link-account-form'
import { AddLinkAccountTable } from './table'
import { DateValue } from '@internationalized/date'

const schema = z
  .object({
    mrn: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    dateOfBirth: z.custom<null | DateValue>().optional(),
  })
  .partial()

type LinkAccountSchemaType = z.infer<typeof schema>

interface AddAccountLinkDialogProps {
  patientId: string
  onCloseModal: (open: boolean) => void
}

const AddAccountLink = ({
  patientId,
  onCloseModal,
}: AddAccountLinkDialogProps) => {
  const [openDialog, setOpenDialog] = useState(false)

  const form = useForm<LinkAccountSchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      mrn: '',
      firstName: '',
      lastName: '',
      dateOfBirth: null,
    },
  })

  const handleCloseModal = (openDialog: boolean) => {
    setOpenDialog(openDialog)
    onCloseModal(true)
  }

  return (
    <Dialog.Root open={openDialog} onOpenChange={handleCloseModal}>
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
        <FormProvider {...form}>
          <LinkAccountForm />
          <AddLinkAccountTable patientId={patientId} />
        </FormProvider>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AddAccountLink }
