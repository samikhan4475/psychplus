'use client'

import { useState } from 'react'
import { Dialog } from '@radix-ui/themes'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'
import { Organization } from '../../types'
import { AddOrganizationButton } from './add-organization-button'
import { EditOrganizationButton } from './edit-organization-button'
import { OrganizationForm } from './organization-form'

interface DialogProps {
  data?: Organization
}

const OrganizationDialog = ({ data }: DialogProps) => {
  const [open, setOpen] = useState(false)

  const onOpenChange = (open: boolean) => {
    setOpen(open)
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {data ? <EditOrganizationButton /> : <AddOrganizationButton />}

      <Dialog.Content className="relative max-w-[800px]">
        <CloseDialogTrigger />

        <Dialog.Title className="font-sans -tracking-[0.25px]">
          {data ? 'Edit' : 'Add'} Organization
        </Dialog.Title>

        <OrganizationForm data={data} onCloseModal={onOpenChange} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { OrganizationDialog }
